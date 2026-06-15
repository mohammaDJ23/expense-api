import {
    Injectable,
    InternalServerErrorException,
    ServiceUnavailableException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { InvalidCredentialBadRequestException } from '@/core/exceptions/invalidCredentialBadRequest.exception';
import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { GetUserByEmailOrNullQuery } from '@/modules/user/applications/queries/getUserByEmailOrNull/getUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { PasswordHasherService } from './passwordHasher.service';
import { PasswordMailerService } from './passwordMailer.service';
import { PasswordStorageService } from './passwordStorage.service';
import { PasswordTokenService } from './passwordToken.service';

import type { INewPasswordPayload } from '@/modules/authentication/domain/interfaces/newPasswordPayload.interface';
import type { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalPasswordService {
    // eslint-disable-next-line max-params
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly passwordMailerService: PasswordMailerService,
        private readonly passwordTokenService: PasswordTokenService,
        private readonly passwordStorageService: PasswordStorageService,
    ) {}

    private getUserByEmail(email: string): Promise<TSelectUser | null> {
        const getUserByEmailOrNullQuery = new GetUserByEmailOrNullQuery(email);
        return this.queryBus.execute<GetUserByEmailOrNullQuery, TSelectUser | null>(
            getUserByEmailOrNullQuery,
        );
    }

    async forgotPassword(data: LocalForgotPasswordRequestDto): Promise<boolean> {
        let user: TSelectUser | null;
        try {
            const storedToken = await this.passwordStorageService.get(data.email);
            if (storedToken) {
                return true;
            }

            user = await this.getUserByEmail(data.email);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

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
                await this.passwordMailerService.sendMail(user, token);
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

    async resetPassword(data: LocalResetPasswordRequestDto): Promise<boolean> {
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

        let user: TSelectUser | null = null;
        try {
            user = await this.getUserByEmail(payload.email);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        if (!user) {
            return true;
        }

        if (user.authProvider !== AuthProvider.LOCAL) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (user.verifiedAt) {
            try {
                const hashedPassword = await this.passwordHasherService.hash(data.newPassword);

                const updateUserCommand = new UpdateUserCommand({
                    id: user.id,
                    updatedAt: getCurrentUTCTimestamp(),
                    hashedPassword,
                });
                await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);
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
