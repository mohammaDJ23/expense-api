import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { Strategy, type Profile } from 'passport-google-oauth20';

import { readSecret } from '@/core/utils/readSecret.util';
import { OauthProvider } from '@/modules/authentication/domain/enums/oauthProvider.enum';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import { OauthAuthenticationService } from './oauthAuthentication.service';

import type { IOauthCurrentUser } from '@/core/features/oauthCurrentUser/oauthCurrentUser.type';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly oauthAuthenticationService: OauthAuthenticationService) {
        const env = new Env();
        super({
            clientID: readSecret(env.require('GOOGLE_OAUTH_CLIENT_ID_FILE')),
            clientSecret: readSecret(env.require('GOOGLE_OAUTH_CLIENT_SECRET_FILE')),
            callbackURL: `${env.require('APP_URL')}${env.require('GOOGLE_OAUTH_CALLBACK_URL')}`,
            scope: ['email', 'profile'],
        });
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    validate(_: string, __: string, profile: Profile): Promise<IOauthCurrentUser> {
        const email = profile.emails?.[0];

        return this.oauthAuthenticationService.execute({
            email: email?.value,
            isVerified: email?.verified,
            provider: OauthProvider.GOOGLE,
            providerId: profile.id,
            profile(creationTime) {
                return {
                    role: UserRoles.USER,
                    firstName: profile.name?.givenName,
                    lastName: profile.name?.familyName,
                    avatar: profile.photos?.[0]?.value,
                    createdAt: creationTime,
                    updatedAt: creationTime,
                };
            },
        });
    }
}
