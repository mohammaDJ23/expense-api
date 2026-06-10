import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { AccessTokenService } from '@/modules/authentication/applications/services/accessToken.service';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { GoogleLoginService } from '@/modules/authentication/applications/services/googleLogin.service';
import { GoogleProviderService } from '@/modules/authentication/applications/services/googleProvider.service';
import { LocalLoginService } from '@/modules/authentication/applications/services/localLogin.service';
import { LocalPasswordService } from '@/modules/authentication/applications/services/localPassword.service';
import { LocalProviderService } from '@/modules/authentication/applications/services/localProvider.service';
import { LocalSignupService } from '@/modules/authentication/applications/services/localSignup.service';
import { LocalVerificationService } from '@/modules/authentication/applications/services/localVerification.service';
import { PasswordHasherService } from '@/modules/authentication/applications/services/passwordHasher.service';
import { PasswordMailerService } from '@/modules/authentication/applications/services/passwordMailer.service';
import { PasswordStorageService } from '@/modules/authentication/applications/services/passwordStorage.service';
import { PasswordTokenService } from '@/modules/authentication/applications/services/passwordToken.service';
import { VerificationMailerService } from '@/modules/authentication/applications/services/verificationMailer.service';
import { VerificationStorageService } from '@/modules/authentication/applications/services/verificationStorage.service';
import { VerificationTokenService } from '@/modules/authentication/applications/services/verificationToken.service';
import { AuthenticationController } from '@/modules/authentication/interface/controllers/v1.controller';

@Module({
    imports: [CqrsModule],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        LocalProviderService,
        GoogleProviderService,
        GoogleLoginService,
        LocalSignupService,
        LocalLoginService,
        LocalPasswordService,
        LocalVerificationService,
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
