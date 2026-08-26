import { Module } from '@nestjs/common';

import { AuthenticationModule as CoreAuthenticationModule } from '@/core/features/authentication/authentication.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { JwtModule } from '@/infrastructure/jwt/jwt.module';
import { CreateEmailIdentityHandler } from '@/modules/authentication/applications/commands/createEmailIdentity/createEmailIdentity.handler';
import { CreateLocalAccountHandler } from '@/modules/authentication/applications/commands/createLocalAccount/createLocalAccount.handler';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
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
import { ResetPasswordMailerService } from '@/modules/authentication/applications/services/resetPasswordMailer.service';
import { VerificationMailerService } from '@/modules/authentication/applications/services/verificationMailer.service';
import { VerificationStorageService } from '@/modules/authentication/applications/services/verificationStorage.service';
import { VerificationTokenService } from '@/modules/authentication/applications/services/verificationToken.service';
import { VerifiedVerificationMailerService } from '@/modules/authentication/applications/services/verifiedVerificationMailer.service';
import { EmailIdentityRepository } from '@/modules/authentication/infrastructure/repositories/emailIdentity.repository';
import { LocalAccountRepository } from '@/modules/authentication/infrastructure/repositories/localAccount.repository';
import { AuthenticationController } from '@/modules/authentication/interface/controllers/v1.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [CqrsModule, JwtModule, UserModule, CoreAuthenticationModule, QueryDispatcherModule],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
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
        VerifiedVerificationMailerService,
        PasswordMailerService,
        ResetPasswordMailerService,
        PasswordTokenService,
        PasswordStorageService,
        PasswordHasherService,
        EmailIdentityRepository,
        CreateEmailIdentityHandler,
        CreateLocalAccountHandler,
        LocalAccountRepository,
    ],
})
export class AuthenticationModule {}
