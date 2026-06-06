import {
    Injectable,
    InternalServerErrorException,
    ServiceUnavailableException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { InvalidCredentialBadRequestException } from '@/core/exceptions/invalidCredentialBadRequest.exception';
import { LocalAuthProviderBadRequestException } from '@/core/exceptions/localAuthProviderBadRequest.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { GetUserByEmailQuery } from '@/modules/user/applications/queries/getUserByEmail/getUserByEmail.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { VerificationMailerService } from './verificationMailer.service';
import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IVerificationPayload } from '@/modules/authentication/domain/interfaces/verificationPayload.interface';
import type { SendVerificationRequestDto } from '@/modules/authentication/interface/dtos/sendVerification.request.dto';
import type { VerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/verifyVerification.request.dto';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class VerificationService {
    // eslint-disable-next-line max-params
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly verificationMailerService: VerificationMailerService,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
    ) {}

    private getUserByEmail(email: string): Promise<TSelectUser | null> {
        const getUserByEmailQuery = new GetUserByEmailQuery(email);
        return this.queryBus.execute<GetUserByEmailQuery, TSelectUser | null>(getUserByEmailQuery);
    }

    async sendVerification(data: SendVerificationRequestDto): Promise<boolean> {
        let user: TSelectUser | null = null;
        try {
            const storedToken = await this.verificationStorageService.get(data.email);
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
            throw new LocalAuthProviderBadRequestException();
        }

        if (!user.verifiedAt) {
            try {
                const token = this.verificationTokenService.sign(user);
                await this.verificationStorageService.set(user.email, token);
                await this.verificationMailerService.sendMail(user, token);
            } catch {
                throw new ServiceUnavailableException('Could not send you a verification link');
            }
        }

        return true;
    }

    async verifyVerification(data: VerifyVerificationRequestDto): Promise<boolean> {
        let payload: IVerificationPayload;
        try {
            payload = this.verificationTokenService.verify(data.token);
        } catch {
            throw new InvalidCredentialBadRequestException();
        }

        let storedToken: string | null = null;
        try {
            storedToken = await this.verificationStorageService.get(payload.email);
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
            throw new LocalAuthProviderBadRequestException();
        }

        if (!user.verifiedAt) {
            try {
                const updateUserCommand = new UpdateUserCommand(user.id, {
                    verifiedAt: new Date(),
                });
                await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);
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
