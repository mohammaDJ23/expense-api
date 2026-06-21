import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { FindUserByEmailOrNullQuery } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { PasswordMailerService } from './passwordMailer.service';
import { PasswordStorageService } from './passwordStorage.service';
import { PasswordTokenService } from './passwordToken.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalForgotPasswordService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly passwordMailerService: PasswordMailerService,
        private readonly passwordTokenService: PasswordTokenService,
        private readonly passwordStorageService: PasswordStorageService,
    ) {}

    async execute(data: LocalForgotPasswordRequestDto): Promise<boolean> {
        try {
            const storedToken = await this.passwordStorageService.get(data.email);
            if (storedToken) {
                return true;
            }
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        const user = await this.queryBus.execute<FindUserByEmailOrNullQuery, ISelectUser | null>(
            new FindUserByEmailOrNullQuery(data.email),
        );

        if (!user) {
            return true;
        }

        if (user.authProvider !== AuthProvider.LOCAL) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (user.verifiedAt) {
            try {
                const token = this.passwordTokenService.sign(user);
                await this.passwordStorageService.set(user.email, token);
                await this.passwordMailerService.execute(user, token);
            } catch {
                try {
                    await this.passwordStorageService.delete(user.email);
                    // eslint-disable-next-line no-empty
                } catch {}

                throw new ServiceUnavailableException('Could not send you a verification link');
            }
        }

        return true;
    }
}
