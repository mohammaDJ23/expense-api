import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { InvalidCredentialBadRequestException } from '@/core/exceptions/invalidCredentialBadRequest.exception';
import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { GetUserByEmailOrNullService } from '@/modules/user/applications/services/getUserByEmailOrNull.service';
import { UpdateUserService } from '@/modules/user/applications/services/updateUser.service';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { PasswordHasherService } from './passwordHasher.service';
import { PasswordStorageService } from './passwordStorage.service';
import { PasswordTokenService } from './passwordToken.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { INewPasswordPayload } from '@/modules/authentication/domain/interfaces/newPasswordPayload.interface';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';

@Injectable()
export class LocalResetPasswordService implements IServiceHandler {
    // eslint-disable-next-line max-params
    constructor(
        private readonly passwordHasherService: PasswordHasherService,
        private readonly passwordTokenService: PasswordTokenService,
        private readonly passwordStorageService: PasswordStorageService,
        private readonly updateUserService: UpdateUserService,
        private readonly getUserByEmailOrNullService: GetUserByEmailOrNullService,
    ) {}

    async execute(data: LocalResetPasswordRequestDto): Promise<boolean> {
        let payload: INewPasswordPayload;
        try {
            payload = this.passwordTokenService.verify(data.token);
        } catch {
            throw new InvalidCredentialBadRequestException();
        }

        let storedToken: string | null = null;
        try {
            storedToken = await this.passwordStorageService.get(payload.email);
            // eslint-disable-next-line no-empty
        } catch {}
        if (storedToken !== data.token) {
            throw new InvalidCredentialBadRequestException();
        }

        const user = await this.getUserByEmailOrNullService.execute(payload.email);

        if (!user) {
            return true;
        }

        if (user.authProvider !== AuthProvider.LOCAL) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (user.verifiedAt) {
            try {
                const hashedPassword = await this.passwordHasherService.hash(data.newPassword);

                await this.updateUserService.execute({
                    id: user.id,
                    updatedAt: getCurrentUTCTimestamp(),
                    hashedPassword,
                });
            } catch {
                throw new InternalServerErrorException('Could not change your password, try again');
            }

            try {
                await this.passwordStorageService.delete(user.email);
                // eslint-disable-next-line no-empty
            } catch {}
        }

        return true;
    }
}
