import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { EmailVerificationCacheService } from '@/modules/authentication/applications/services/emailVerificationCache.service';
import { EmailVerificationMailerService } from '@/modules/authentication/applications/services/emailVerificationMailer.service';
import { EmailVerificationTokenService } from '@/modules/authentication/applications/services/emailVerificationToken.service';
import { PasswordHasherService } from '@/modules/authentication/applications/services/passwordHasher.service';
import { AuthenticationController } from '@/modules/authentication/interface/controllers/v1.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [UserModule, CqrsModule],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        EmailVerificationMailerService,
        EmailVerificationTokenService,
        EmailVerificationCacheService,
        PasswordHasherService,
    ],
})
export class AuthenticationModule {}
