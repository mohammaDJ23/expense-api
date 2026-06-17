import { ConflictException, Injectable, ServiceUnavailableException } from '@nestjs/common';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateUserService } from '@/modules/user/applications/services/createUser.service';
import { IsUserExistsByEmailService } from '@/modules/user/applications/services/isUserExistsByEmail.service';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import { PasswordHasherService } from './passwordHasher.service';
import { VerificationMailerService } from './verificationMailer.service';
import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalSignupService implements IServiceHandler {
    // eslint-disable-next-line max-params
    constructor(
        private readonly createUserService: CreateUserService,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly verificationMailerService: VerificationMailerService,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
        private readonly isUserExistsByEmailService: IsUserExistsByEmailService,
    ) {}

    async execute(data: LocalSignupRequestDto): Promise<boolean> {
        const isExists = await this.isUserExistsByEmailService.execute(data.email);

        if (isExists) {
            throw new ConflictException('The Email already exists.');
        }

        let createdUser: TSelectUser;
        try {
            const hashedPassword = await this.passwordHasherService.hash(data.password);

            createdUser = await this.createUserService.execute({
                email: data.email,
                hashedPassword,
                role: UserRoles.USER,
                authProvider: AuthProvider.LOCAL,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        try {
            const token = this.verificationTokenService.sign(createdUser);
            await this.verificationStorageService.set(createdUser.email, token);
            await this.verificationMailerService.execute(createdUser, token);
        } catch {
            throw new ServiceUnavailableException(
                'Your email has been saved but we could not send you the verification link, send the verification link manually',
            );
        }

        return true;
    }
}
