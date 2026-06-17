import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { InvalidCredentialBadRequestException } from '@/core/exceptions/invalidCredentialBadRequest.exception';
import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { GetUserByEmailOrNullQuery } from '@/modules/user/applications/queries/getUserByEmailOrNull/getUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IVerificationPayload } from '@/modules/authentication/domain/interfaces/verificationPayload.interface';
import type { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalVerifyVerificationService implements IServiceHandler {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
    ) {}

    async execute(data: LocalVerifyVerificationRequestDto): Promise<boolean> {
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
            const getUserByEmailOrNullQuery = new GetUserByEmailOrNullQuery(payload.email);
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
                const updateUserCommand = new UpdateUserCommand({
                    id: user.id,
                    updatedAt: getCurrentUTCTimestamp(),
                    verifiedAt: getCurrentUTCTimestamp(),
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
