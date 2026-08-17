import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { VerifiedVerificationMailerService } from '@/modules/authentication/applications/services/verifiedVerificationMailer.service';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { FindUserByEmailOrNullQuery } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IVerificationPayload } from '@/modules/authentication/domain/types/verificationPayload.type';
import type { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalVerifyVerificationService implements IService<
    LocalVerifyVerificationRequestDto,
    boolean
> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly commandBus: CommandBus,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
        private readonly verifiedVerificationMailerService: VerifiedVerificationMailerService,
    ) {}

    async execute(input: LocalVerifyVerificationRequestDto): Promise<boolean> {
        let payload: IVerificationPayload;
        try {
            payload = this.verificationTokenService.verify(input.token);
        } catch {
            throw new BadRequestException();
        }

        {
            let storedToken: string | null = null;
            try {
                storedToken = await this.verificationStorageService.get(payload.email);
            } catch {}
            if (storedToken !== input.token) {
                throw new BadRequestException();
            }
        }

        const user = await this.queryDispatcher.execute<
            FindUserByEmailOrNullQuery,
            ISelectUser | null
        >(new FindUserByEmailOrNullQuery({ email: payload.email }));

        if (!user) {
            throw new BadRequestException();
        }

        if (user.authProvider !== AuthProvider.LOCAL) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (user.verifiedAt) {
            throw new ForbiddenException();
        }

        try {
            await this.commandBus.execute<UpdateUserCommand, ISelectUser>(
                new UpdateUserCommand({
                    id: user.id,
                    updatedAt: getCurrentUTCTimestamp(),
                    verifiedAt: getCurrentUTCTimestamp(),
                }),
            );
        } catch {
            throw new InternalServerErrorException('Could not verify your email, try again');
        }

        try {
            this.verifiedVerificationMailerService.execute(user);

            await this.verificationStorageService.delete(user.email);
        } catch {}

        return true;
    }
}
