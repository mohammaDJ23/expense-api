import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AccessTokenService } from '@/modules/authentication/applications/services/accessToken.service';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { PasswordHasherService } from '@/modules/authentication/applications/services/passwordHasher.service';
import { VerificationMailerService } from '@/modules/authentication/applications/services/verificationMailer.service';
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
        PasswordHasherService,
        AccessTokenService,
    ],
})
export class AuthenticationModule {}
