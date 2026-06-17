import { Module } from '@nestjs/common';

import { AuthenticationModule as CoreAuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { JwtModule } from '@/infrastructure/jwt/jwt.module';
import { AccessTokenService } from '@/modules/authentication/applications/services/accessToken.service';
import { GoogleLoginService } from '@/modules/authentication/applications/services/googleLogin.service';
import { LocalForgotPasswordService } from '@/modules/authentication/applications/services/localForgotPassword.service';
import { LocalLoginService } from '@/modules/authentication/applications/services/localLogin.service';
import { LocalResetPasswordService } from '@/modules/authentication/applications/services/localResetPassword.service';
import { LocalSendVerificationService } from '@/modules/authentication/applications/services/localSendVerification.service';
import { LocalSignupService } from '@/modules/authentication/applications/services/localSignup.service';
import { LocalVerifyVerificationService } from '@/modules/authentication/applications/services/localVerifyVerification.service';
import { PasswordHasherService } from '@/modules/authentication/applications/services/passwordHasher.service';
import { PasswordMailerService } from '@/modules/authentication/applications/services/passwordMailer.service';
import { PasswordStorageService } from '@/modules/authentication/applications/services/passwordStorage.service';
import { PasswordTokenService } from '@/modules/authentication/applications/services/passwordToken.service';
import { VerificationMailerService } from '@/modules/authentication/applications/services/verificationMailer.service';
import { VerificationStorageService } from '@/modules/authentication/applications/services/verificationStorage.service';
import { VerificationTokenService } from '@/modules/authentication/applications/services/verificationToken.service';
import { AuthenticationController } from '@/modules/authentication/interface/controllers/v1.controller';

@Module({
    imports: [CqrsModule, JwtModule, CoreAuthenticationModule],
    controllers: [AuthenticationController],
    providers: [
        GoogleLoginService,
        LocalSignupService,
        LocalLoginService,
        LocalForgotPasswordService,
        LocalResetPasswordService,
        LocalVerifyVerificationService,
        LocalSendVerificationService,
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
