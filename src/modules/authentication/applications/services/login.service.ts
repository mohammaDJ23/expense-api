import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ProcessFailedUnAuthorizedException } from '@/core/exceptions/processFailedUnauthrized.exception';
import { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { GetUserByEmailQuery } from '@/modules/user/applications/queries/getUserByEmail/getUserByEmail.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { AccessTokenService } from './accessToken.service';
import { PasswordHasherService } from './passwordHasher.service';

import type { LoginRequestDto } from '@/modules/authentication/interface/dtos/login.request.dto';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LoginService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    async login(data: LoginRequestDto): Promise<AccessTokenEntity> {
        let user: TSelectUser | null = null;
        try {
            const getUserByEmailQuery = new GetUserByEmailQuery(data.email);
            user = await this.queryBus.execute<GetUserByEmailQuery, TSelectUser | null>(
                getUserByEmailQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        if (!user) {
            throw new ProcessFailedUnAuthorizedException();
        }

        if (user.authProvider !== AuthProvider.LOCAL || !user.hashedPassword) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (!user.verifiedAt) {
            throw new ProcessFailedUnAuthorizedException();
        }

        let isPasswordValid = false;
        try {
            isPasswordValid = await this.passwordHasherService.verify(
                user.hashedPassword,
                data.password,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
        if (!isPasswordValid) {
            throw new ProcessFailedUnAuthorizedException();
        }

        try {
            const token = this.accessTokenService.sign(user);

            const updateUserCommand = new UpdateUserCommand(user.id, {
                lastLoginAt: new Date(),
            });
            await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);

            return AccessTokenEntity.create(token);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
