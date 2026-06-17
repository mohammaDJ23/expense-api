import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetUserByEmailOrNullQuery } from '@/modules/user/applications/queries/getUserByEmailOrNull/getUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { VerificationMailerService } from './verificationMailer.service';
import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { LocalSendVerificationRequestDto } from '@/modules/authentication/interface/dtos/localSendVerification.request.dto';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalSendVerificationService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly verificationMailerService: VerificationMailerService,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
    ) {}

    async execute(data: LocalSendVerificationRequestDto): Promise<boolean> {
        let user: TSelectUser | null = null;
        try {
            const storedToken = await this.verificationStorageService.get(data.email);
            if (storedToken) {
                return true;
            }

            const getUserByEmailOrNullQuery = new GetUserByEmailOrNullQuery(data.email);
            user = await this.queryBus.execute<GetUserByEmailOrNullQuery, TSelectUser | null>(
                getUserByEmailOrNullQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        if (!user) {
            return true;
        }

        if (user.authProvider !== AuthProvider.LOCAL) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (!user.verifiedAt) {
            try {
                const token = this.verificationTokenService.sign(user);
                await this.verificationStorageService.set(user.email, token);
                await this.verificationMailerService.execute(user, token);
            } catch {
                try {
                    await this.verificationStorageService.delete(user.email);
                    // eslint-disable-next-line no-empty
                } catch {}

                throw new ServiceUnavailableException('Could not send you a verification link');
            }
        }

        return true;
    }
}
