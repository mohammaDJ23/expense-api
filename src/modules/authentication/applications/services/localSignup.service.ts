import { Injectable, ServiceUnavailableException } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateUserService } from '@/modules/user/applications/services/createUser.service';
import { UserUniqueEmailValidatorService } from '@/modules/user/applications/services/validators/userUniqueEmailValidator.service';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import { PasswordHasherService } from './passwordHasher.service';
import { VerificationMailerService } from './verificationMailer.service';
import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class LocalSignupService implements IService<LocalSignupRequestDto, boolean> {
    constructor(
        private readonly passwordHasherService: PasswordHasherService,
        private readonly verificationMailerService: VerificationMailerService,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
        private readonly userUniqueEmailValidationService: UserUniqueEmailValidatorService,
        private readonly createUserService: CreateUserService,
    ) {}

    async execute(input: LocalSignupRequestDto): Promise<boolean> {
        await this.userUniqueEmailValidationService.validate({
            email: input.email,
        });

        let createdUser: ISelectUser;
        try {
            const hashedPassword = await this.passwordHasherService.hash(input.password);

            createdUser = await this.createUserService.execute({
                email: input.email,
                hashedPassword,
                role: UserRoles.USER,
                authProvider: AuthProvider.LOCAL,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        const token = this.verificationTokenService.sign(createdUser);

        try {
            await this.verificationStorageService.set(createdUser.email, token);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        try {
            await this.verificationMailerService.execute({ user: createdUser, token });
        } catch {
            try {
                await this.verificationStorageService.delete(createdUser.email);
            } catch {}

            throw new ServiceUnavailableException(
                'Your email has been saved but we could not send you the verification link',
            );
        }

        return true;
    }
}
