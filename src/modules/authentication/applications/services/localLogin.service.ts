import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { FindUserByEmailOrNullQuery } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { AccessTokenService } from './accessToken.service';
import { PasswordHasherService } from './passwordHasher.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { Response } from 'express';

@Injectable()
export class LocalLoginService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    async execute(response: Response, data: LocalLoginRequestDto): Promise<ISelectUser> {
        const user = await this.queryBus.execute<FindUserByEmailOrNullQuery, ISelectUser | null>(
            new FindUserByEmailOrNullQuery({
                email: data.email,
            }),
        );

        if (!user) {
            throw new UnauthorizedException();
        }

        if (user.authProvider !== AuthProvider.LOCAL || !user.hashedPassword) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (!user.verifiedAt) {
            throw new ForbiddenException();
        }

        {
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
                throw new ForbiddenException();
            }
        }

        {
            const token = this.accessTokenService.issue(user);
            this.accessTokenService.setCookie(response, token);
        }

        return this.commandBus.execute<UpdateUserCommand, ISelectUser>(
            new UpdateUserCommand({
                id: user.id,
                updatedAt: getCurrentUTCTimestamp(),
                lastLoginAt: getCurrentUTCTimestamp(),
            }),
        );
    }
}
