import { Injectable } from '@nestjs/common';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedForbiddenException } from '@/core/exceptions/processFailedForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ProcessFailedUnAuthorizedException } from '@/core/exceptions/processFailedUnauthorized.exception';
import { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
import { GetUserByEmailOrNullService } from '@/modules/user/applications/services/getUserByEmailOrNull.service';
import { UpdateUserService } from '@/modules/user/applications/services/updateUser.service';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { AccessTokenService } from './accessToken.service';
import { PasswordHasherService } from './passwordHasher.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';

@Injectable()
export class LocalLoginService implements IServiceHandler {
    constructor(
        private readonly passwordHasherService: PasswordHasherService,
        private readonly accessTokenService: AccessTokenService,
        private readonly updateUserService: UpdateUserService,
        private readonly getUserByEmailOrNullService: GetUserByEmailOrNullService,
    ) {}

    async execute(data: LocalLoginRequestDto): Promise<AccessTokenEntity> {
        const user = await this.getUserByEmailOrNullService.execute(data.email);

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

        const token = this.accessTokenService.execute(user);
        const accessToken = AccessTokenEntity.create(token);

        await this.updateUserService.execute({
            id: user.id,
            updatedAt: getCurrentUTCTimestamp(),
            lastLoginAt: getCurrentUTCTimestamp(),
        });

        return accessToken;
    }
}
