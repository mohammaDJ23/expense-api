import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    ServiceUnavailableException,
} from '@nestjs/common';

import { LocalAuthProviderForbiddenException } from '@/core/exceptions/localAuthProviderForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindUserByEmailOrNullQuery } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';

import { VerificationMailerService } from './verificationMailer.service';
import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { LocalSendVerificationRequestDto } from '@/modules/authentication/interface/dtos/localSendVerification.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalSendVerificationService implements IService<
    LocalSendVerificationRequestDto,
    boolean
> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly verificationMailerService: VerificationMailerService,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
    ) {}

    async execute(input: LocalSendVerificationRequestDto): Promise<boolean> {
        try {
            const storedToken = await this.verificationStorageService.get(input.email);
            if (storedToken) {
                return true;
            }
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        const user = await this.queryDispatcher.execute<
            FindUserByEmailOrNullQuery,
            ISelectUser | null
        >(
            new FindUserByEmailOrNullQuery({
                email: input.email,
            }),
        );

        if (!user) {
            throw new BadRequestException();
        }

        if (user.authProvider !== AuthProvider.LOCAL) {
            throw new LocalAuthProviderForbiddenException();
        }

        if (user.verifiedAt) {
            throw new ForbiddenException();
        }

        const token = this.verificationTokenService.sign(user);

        try {
            await this.verificationStorageService.set(user.email, token);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        try {
            await this.verificationMailerService.execute({ user, token });
        } catch {
            try {
                await this.verificationStorageService.delete(user.email);
            } catch {}

            throw new ServiceUnavailableException('Could not send you a verification link');
        }

        return true;
    }
}
