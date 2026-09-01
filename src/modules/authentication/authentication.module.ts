import { Module } from '@nestjs/common';

import { AuthenticationModule as CoreAuthenticationModule } from '@/core/features/authentication/authentication.module';
import { CursorPaginationModule } from '@/core/features/pagination/cursor/cursorPagination.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { JwtModule } from '@/infrastructure/jwt/jwt.module';
import { FindEmailIdentityByEmailOrThrowHandler } from '@/modules/authentication//applications/queries/findEmailIdentityByEmailOrThrow/findEmailIdentityByEmailOrThrow.handler';
import { CreateEmailIdentityHandler } from '@/modules/authentication/applications/commands/createEmailIdentity/createEmailIdentity.handler';
import { CreateLocalAccountHandler } from '@/modules/authentication/applications/commands/createLocalAccount/createLocalAccount.handler';
import { CreateOauthAccountHandler } from '@/modules/authentication/applications/commands/createOauthAccount/createOauthAccount.handler';
import { UpdateLocalAccountHandler } from '@/modules/authentication/applications/commands/updateLocalAccount/updateLocalAccount.handler';
import { UpdateOauthAccountHandler } from '@/modules/authentication/applications/commands/updateOauthAccount/updateOauthAccount.handler';
import { SendForgotPasswordEmailHandler } from '@/modules/authentication/applications/messages/createdLocalForgotPassword/sendForgotPasswordEmail.handler';
import { DeleteLocalResetPasswordCacheHandler } from '@/modules/authentication/applications/messages/createdLocalResetPassword/deleteLocalResetPasswordCache.handler';
import { SendLocalResetPasswordEmailHandler } from '@/modules/authentication/applications/messages/createdLocalResetPassword/sendLocalResetPasswordEmail.handler';
import { SendSignupInitiationEmailHandler } from '@/modules/authentication/applications/messages/createdLocalSignupInitiation/sendSignupInitiationEmail.handler';
import { EmailIdentityListCursorPaginationDefinition } from '@/modules/authentication/applications/pagination/cursor/emailIdentityListCursorPagination.definition';
import { ExistsEmailIdentityByEmailHandler } from '@/modules/authentication/applications/queries/existsEmailIdentityByEmail/existsEmailIdentityByEmail.handler';
import { FindEmailIdentityByEmailOrNullHandler } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.handler';
import { FindEmailIdentityByUserIdOrNullHandler } from '@/modules/authentication/applications/queries/findEmailIdentityByUserIdOrNull/findEmailIdentityByUserIdOrNull.handler';
import { FindEmailIdentityByUserIdOrThrowHandler } from '@/modules/authentication/applications/queries/findEmailIdentityByUserIdOrThrow/findEmailIdentityByUserIdOrThrow.handler';
import { FindEmailIdentityListHandler } from '@/modules/authentication/applications/queries/findEmailIdentityList/findEmailIdentityList.handler';
import { FindLocalAccountByEmailIdOrNullHandler } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.handler';
import { FindOauthAccountByEmailIdOrNullHandler } from '@/modules/authentication/applications/queries/findOauthAccountByEmailIdOrNull/findOauthAccountByEmailIdOrNull.handler';
import { FindOauthAccountByProviderAndProviderIdOrNullHandler } from '@/modules/authentication/applications/queries/findOauthAccountByProviderAndProviderIdOrNull/findOauthAccountByProviderAndProviderIdOrNull.handler';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { FindEmailIdentityListService } from '@/modules/authentication/applications/services/findEmailIdentityList.service';
import { LocalForgotPasswordService } from '@/modules/authentication/applications/services/localForgotPassword.service';
import { LocalLoginService } from '@/modules/authentication/applications/services/localLogin.service';
import { LocalResetPasswordService } from '@/modules/authentication/applications/services/localResetPassword.service';
import { LocalResetPasswordMailerService } from '@/modules/authentication/applications/services/localResetPasswordMailer.service';
import { LocalSignupService } from '@/modules/authentication/applications/services/localSignup.service';
import { LocalSignupInitiationService } from '@/modules/authentication/applications/services/localSignupInitiation.service';
import { LocalSignupInitiationMailerService } from '@/modules/authentication/applications/services/localSignupInitiationMailer.service';
import { LocalSignupStorageService } from '@/modules/authentication/applications/services/localSignupStorage.service';
import { LocalSignupTokenService } from '@/modules/authentication/applications/services/localSignupToken.service';
import { OauthLoginService } from '@/modules/authentication/applications/services/oauthLogin.service';
import { PasswordHasherService } from '@/modules/authentication/applications/services/passwordHasher.service';
import { PasswordMailerService } from '@/modules/authentication/applications/services/passwordMailer.service';
import { PasswordStorageService } from '@/modules/authentication/applications/services/passwordStorage.service';
import { PasswordTokenService } from '@/modules/authentication/applications/services/passwordToken.service';
import { UniqueEmailIdentityValidatorService } from '@/modules/authentication/applications/services/validators/uniqueEmailIdentityValidator.service';
import { EmailIdentityRepository } from '@/modules/authentication/infrastructure/repositories/emailIdentity.repository';
import { LocalAccountRepository } from '@/modules/authentication/infrastructure/repositories/localAccount.repository';
import { OauthAccountRepository } from '@/modules/authentication/infrastructure/repositories/oauthAccount.repository';
import { AuthenticationController } from '@/modules/authentication/interface/controllers/v1.controller';
import { OutboxModule } from '@/modules/outbox/outbox.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [
        CqrsModule,
        JwtModule,
        UserModule,
        CoreAuthenticationModule,
        QueryDispatcherModule,
        OutboxModule,
        CursorPaginationModule,
    ],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        OauthLoginService,
        LocalSignupService,
        LocalLoginService,
        LocalForgotPasswordService,
        LocalResetPasswordService,
        PasswordMailerService,
        LocalResetPasswordMailerService,
        PasswordTokenService,
        PasswordStorageService,
        PasswordHasherService,
        EmailIdentityRepository,
        CreateEmailIdentityHandler,
        CreateLocalAccountHandler,
        LocalAccountRepository,
        CreateOauthAccountHandler,
        OauthAccountRepository,
        FindOauthAccountByProviderAndProviderIdOrNullHandler,
        FindLocalAccountByEmailIdOrNullHandler,
        FindEmailIdentityByEmailOrNullHandler,
        ExistsEmailIdentityByEmailHandler,
        UpdateLocalAccountHandler,
        UpdateOauthAccountHandler,
        UniqueEmailIdentityValidatorService,
        UniqueEmailIdentityValidatorService,
        FindEmailIdentityByEmailOrThrowHandler,
        DeleteLocalResetPasswordCacheHandler,
        SendLocalResetPasswordEmailHandler,
        SendForgotPasswordEmailHandler,
        FindEmailIdentityByUserIdOrNullHandler,
        FindOauthAccountByEmailIdOrNullHandler,
        FindEmailIdentityListHandler,
        EmailIdentityListCursorPaginationDefinition,
        FindEmailIdentityListService,
        FindEmailIdentityByUserIdOrThrowHandler,
        SendSignupInitiationEmailHandler,
        LocalSignupInitiationService,
        LocalSignupInitiationMailerService,
        LocalSignupStorageService,
        LocalSignupTokenService,
    ],
    exports: [FindEmailIdentityListService],
})
export class AuthenticationModule {}
