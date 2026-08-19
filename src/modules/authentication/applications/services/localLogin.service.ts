import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { AccessTokenService } from '@/core/features/accessToken/accessToken.service';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { FindUserByEmailOrNullQuery } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.query';
import { UpdateUserService } from '@/modules/user/applications/services/updateUser.service';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { PasswordHasherService } from './passwordHasher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { Response } from 'express';

interface IInput {
    response: Response;
    body: LocalLoginRequestDto;
}

@Injectable()
export class LocalLoginService implements IService<IInput, ISelectUser> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly accessTokenService: AccessTokenService,
        private readonly updateUserService: UpdateUserService,
    ) {}

    async execute(input: IInput): Promise<ISelectUser> {
        const user = await this.queryDispatcher.execute<
            FindUserByEmailOrNullQuery,
            ISelectUser | null
        >(
            new FindUserByEmailOrNullQuery({
                email: input.body.email,
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
                    input.body.password,
                );
            } catch {
                throw new ProcessFailedInternalServerErrorException();
            }
            if (!isPasswordValid) {
                throw new ForbiddenException();
            }
        }

        {
            const token = this.accessTokenService.sign(user);
            this.accessTokenService.setCookie(input.response, token);
        }

        return this.updateUserService.execute({
            id: user.id,
            updatedAt: getCurrentUTCTimestamp(),
            lastLoginAt: getCurrentUTCTimestamp(),
        });
    }
}
