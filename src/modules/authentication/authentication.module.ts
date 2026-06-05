import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AccessTokenService } from '@/modules/authentication/applications/services/accessToken.service';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { ForgotPasswordMailerService } from '@/modules/authentication/applications/services/forgotPasswordMailer.service';
import { ForgotPasswordTokenService } from '@/modules/authentication/applications/services/forgotPasswordToken.service';
import { PasswordHasherService } from '@/modules/authentication/applications/services/passwordHasher.service';
import { VerificationMailerService } from '@/modules/authentication/applications/services/verificationMailer.service';
import { VerificationStorageService } from '@/modules/authentication/applications/services/verificationStorage.service';
import { VerificationTokenService } from '@/modules/authentication/applications/services/verificationToken.service';
import { AuthenticationController } from '@/modules/authentication/interface/controllers/v1.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [UserModule, CqrsModule],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        VerificationMailerService,
        VerificationTokenService,
        VerificationStorageService,
        ForgotPasswordMailerService,
        ForgotPasswordTokenService,
        PasswordHasherService,
        AccessTokenService,
    ],
})
export class AuthenticationModule {}
