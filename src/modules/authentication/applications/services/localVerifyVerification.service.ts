import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { GetUserByEmailOrNullService } from '@/modules/user/applications/services/getUserByEmailOrNull.service';
import { UpdateUserService } from '@/modules/user/applications/services/updateUser.service';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IVerificationPayload } from '@/modules/authentication/domain/interfaces/verificationPayload.interface';
import type { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';

@Injectable()
export class LocalVerifyVerificationService implements IServiceHandler {
    constructor(
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
        private readonly updateUserService: UpdateUserService,
        private readonly getUserByEmailOrNullService: GetUserByEmailOrNullService,
    ) {}

    async execute(data: LocalVerifyVerificationRequestDto): Promise<boolean> {
        let payload: IVerificationPayload;
        try {
            payload = this.verificationTokenService.verify(data.token);
        } catch {
            throw new BadRequestException();
        }

        let storedToken: string | null = null;
        try {
            storedToken = await this.verificationStorageService.get(payload.email);
            // eslint-disable-next-line no-empty
        } catch {}
        if (storedToken !== data.token) {
            throw new BadRequestException();
        }

        const user = await this.getUserByEmailOrNullService.execute(payload.email);

        if (!user) {
            return true;
        }

        if (user.authProvider !== AuthProvider.LOCAL) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (!user.verifiedAt) {
            try {
                await this.updateUserService.execute({
                    id: user.id,
                    updatedAt: getCurrentUTCTimestamp(),
                    verifiedAt: getCurrentUTCTimestamp(),
                });
            } catch {
                throw new InternalServerErrorException('Could not verify your email, try again');
            }

            try {
                await this.verificationStorageService.delete(user.email);
                // eslint-disable-next-line no-empty
            } catch {}
        }

        return true;
    }
}
