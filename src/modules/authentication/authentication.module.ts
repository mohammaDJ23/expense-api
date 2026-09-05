import { Module } from '@nestjs/common';

import { AccessTokenModule } from '@/core/features/accessToken/accessToken.module';
import { CacheModule } from '@/core/features/cache/cache.module';
import { CursorPaginationModule } from '@/core/features/pagination/cursor/cursorPagination.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { JwtModule } from '@/infrastructure/jwt/jwt.module';
import { FindEmailIdentityByEmailOrThrowHandler } from '@/modules/authentication//applications/queries/findEmailIdentityByEmailOrThrow/findEmailIdentityByEmailOrThrow.handler';
import { OauthAuthenticationService } from '@/modules/authentication//applications/services/oauthAuthentication.service';
import { CreateEmailIdentityHandler } from '@/modules/authentication/applications/commands/createEmailIdentity/createEmailIdentity.handler';
import { CreateLocalAccountHandler } from '@/modules/authentication/applications/commands/createLocalAccount/createLocalAccount.handler';
import { CreateOauthAccountHandler } from '@/modules/authentication/applications/commands/createOauthAccount/createOauthAccount.handler';
import { UpdateLocalAccountHandler } from '@/modules/authentication/applications/commands/updateLocalAccount/updateLocalAccount.handler';
import { UpdateOauthAccountHandler } from '@/modules/authentication/applications/commands/updateOauthAccount/updateOauthAccount.handler';
import { DeleteLocalAccountCreationCacheHandler } from '@/modules/authentication/applications/messages/localAccountCreation/deleteLocalAccountCreationCache.handler';
import { SendLocalAccountInitiationEmailHandler } from '@/modules/authentication/applications/messages/localAccountInitiation/sendLocalAccountInitiationEmail.handler';
import { SendForgotPasswordEmailHandler } from '@/modules/authentication/applications/messages/localForgotPassword/sendForgotPasswordEmail.handler';
import { DeleteLocalResetPasswordCacheHandler } from '@/modules/authentication/applications/messages/localResetPassword/deleteLocalResetPasswordCache.handler';
import { SendLocalResetPasswordEmailHandler } from '@/modules/authentication/applications/messages/localResetPassword/sendLocalResetPasswordEmail.handler';
import { DeleteLocalSignupCacheHandler } from '@/modules/authentication/applications/messages/localSignup/deleteLocalSignupCache.handler';
import { SendSignupInitiationEmailHandler } from '@/modules/authentication/applications/messages/localSignupInitiation/sendSignupInitiationEmail.handler';
import { EmailIdentityListCursorPaginationDefinition } from '@/modules/authentication/applications/pagination/cursor/emailIdentityListCursorPagination.definition';
import { ExistsEmailIdentityByEmailHandler } from '@/modules/authentication/applications/queries/existsEmailIdentityByEmail/existsEmailIdentityByEmail.handler';
import { FindEmailIdentityByEmailOrNullHandler } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.handler';
import { FindEmailIdentityByUserIdOrThrowHandler } from '@/modules/authentication/applications/queries/findEmailIdentityByUserIdOrThrow/findEmailIdentityByUserIdOrThrow.handler';
import { FindEmailIdentityListHandler } from '@/modules/authentication/applications/queries/findEmailIdentityList/findEmailIdentityList.handler';
import { FindLocalAccountByEmailIdOrNullHandler } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.handler';
import { FindOauthAccountByProviderAndProviderIdOrNullHandler } from '@/modules/authentication/applications/queries/findOauthAccountByProviderAndProviderIdOrNull/findOauthAccountByProviderAndProviderIdOrNull.handler';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { FindEmailIdentityListService } from '@/modules/authentication/applications/services/findEmailIdentityList.service';
import { LocalAccountCreationService } from '@/modules/authentication/applications/services/localAccountCreation.service';
import { LocalAccountInitiationService } from '@/modules/authentication/applications/services/localAccountInitiation.service';
import { LocalAccountInitiationMailerService } from '@/modules/authentication/applications/services/localAccountInitiationMailer.service';
import { LocalAccountStorageService } from '@/modules/authentication/applications/services/localAccountStorage.service';
import { LocalAccountTokenService } from '@/modules/authentication/applications/services/localAccountToken.service';
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
import { GoogleAuthGuard } from '@/modules/authentication/interface/oauth/google/googleAuth.guard';
import { GoogleAuthStrategy } from '@/modules/authentication/interface/oauth/google/googleAuth.strategy';
import { OutboxModule } from '@/modules/outbox/outbox.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [
        CqrsModule,
        JwtModule,
        UserModule,
        QueryDispatcherModule,
        OutboxModule,
        CursorPaginationModule,
        AccessTokenModule,
        CacheModule,
    ],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        GoogleAuthGuard,
        GoogleAuthStrategy,
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
        FindEmailIdentityListHandler,
        EmailIdentityListCursorPaginationDefinition,
        FindEmailIdentityListService,
        FindEmailIdentityByUserIdOrThrowHandler,
        SendSignupInitiationEmailHandler,
        LocalSignupInitiationService,
        LocalSignupInitiationMailerService,
        LocalSignupStorageService,
        LocalSignupTokenService,
        OauthAuthenticationService,
        DeleteLocalSignupCacheHandler,
        DeleteLocalAccountCreationCacheHandler,
        SendLocalAccountInitiationEmailHandler,
        LocalAccountCreationService,
        LocalAccountInitiationService,
        LocalAccountInitiationMailerService,
        LocalAccountStorageService,
        LocalAccountTokenService,
    ],
    exports: [FindEmailIdentityListService],
})
export class AuthenticationModule {}
