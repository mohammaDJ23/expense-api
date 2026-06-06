import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { InternalServerProcessFailedException } from '@/core/exceptions/internalServerProcessFailed.exception';
import { UnAuthorizedProcessFailedException } from '@/core/exceptions/unauthorizedProcessFailed.exception';
import { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { GetUserByEmailQuery } from '@/modules/user/applications/queries/getUserByEmail/getUserByEmail.query';

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
            throw new InternalServerProcessFailedException();
        }
        if (!user?.verifiedAt) {
            throw new UnAuthorizedProcessFailedException();
        }

        let isPasswordValid = false;
        try {
            isPasswordValid = await this.passwordHasherService.verify(
                user.hashedPassword,
                data.password,
            );
        } catch {
            throw new InternalServerProcessFailedException();
        }
        if (!isPasswordValid) {
            throw new UnAuthorizedProcessFailedException();
        }

        try {
            const token = this.accessTokenService.sign(user);

            const updateUserCommand = new UpdateUserCommand(user.id, {
                lastLoginAt: new Date(),
            });
            await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);

            return AccessTokenEntity.create(token);
        } catch {
            throw new InternalServerProcessFailedException();
        }
    }
}
