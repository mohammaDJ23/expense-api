import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedForbiddenException } from '@/core/exceptions/processFailedForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ProcessFailedUnAuthorizedException } from '@/core/exceptions/processFailedUnauthorized.exception';
import { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { GetUserByEmailOrNullQuery } from '@/modules/user/applications/queries/getUserByEmailOrNull/getUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { AccessTokenService } from './accessToken.service';
import { PasswordHasherService } from './passwordHasher.service';

import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalLoginService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    async login(data: LocalLoginRequestDto): Promise<AccessTokenEntity> {
        let user: TSelectUser | null = null;
        try {
            const getUserByEmailOrNullQuery = new GetUserByEmailOrNullQuery(data.email);
            user = await this.queryBus.execute<GetUserByEmailOrNullQuery, TSelectUser | null>(
                getUserByEmailOrNullQuery,
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
            throw new ProcessFailedForbiddenException();
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
            throw new ProcessFailedForbiddenException();
        }

        try {
            const token = this.accessTokenService.execute(user);

            const updateUserCommand = new UpdateUserCommand({
                id: user.id,
                updatedAt: getCurrentUTCTimestamp(),
                lastLoginAt: getCurrentUTCTimestamp(),
            });
            await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);

            return AccessTokenEntity.create(token);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
