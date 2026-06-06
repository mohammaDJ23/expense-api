import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AccessTokenService } from '@/modules/authentication/applications/services/accessToken.service';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { LoginService } from '@/modules/authentication/applications/services/login.service';
import { PasswordService } from '@/modules/authentication/applications/services/password.service';
import { PasswordHasherService } from '@/modules/authentication/applications/services/passwordHasher.service';
import { PasswordMailerService } from '@/modules/authentication/applications/services/passwordMailer.service';
import { PasswordStorageService } from '@/modules/authentication/applications/services/passwordStorage.service';
import { PasswordTokenService } from '@/modules/authentication/applications/services/passwordToken.service';
import { SignupService } from '@/modules/authentication/applications/services/signup.service';
import { VerificationService } from '@/modules/authentication/applications/services/verification.service';
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
        SignupService,
        LoginService,
        PasswordService,
        VerificationService,
        VerificationMailerService,
        VerificationTokenService,
        VerificationStorageService,
        PasswordMailerService,
        PasswordTokenService,
        PasswordStorageService,
        PasswordHasherService,
        AccessTokenService,
    ],
})
export class AuthenticationModule {}
