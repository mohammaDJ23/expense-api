import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { Strategy, type Profile } from 'passport-google-oauth20';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { readSecret } from '@/common/utils/readSecret.util';
import { ProcessFailedForbiddenException } from '@/core/exceptions/processFailedForbidden.exception';
import { CreateUserService } from '@/modules/user/applications/services/createUser.service';
import { GetUserByEmailOrNullService } from '@/modules/user/applications/services/getUserByEmailOrNull.service';
import { UpdateUserService } from '@/modules/user/applications/services/updateUser.service';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly createUserService: CreateUserService,
        private readonly updateUserService: UpdateUserService,
        private readonly getUserByEmailOrNullService: GetUserByEmailOrNullService,
    ) {
        const env = new Env();
        super({
            clientID: readSecret(env.require('GOOGLE_OAUTH_CLIENT_ID_FILE')),
            clientSecret: readSecret(env.require('GOOGLE_OAUTH_CLIENT_SECRET_FILE')),
            callbackURL: `${env.require('APP_URL')}${env.require('GOOGLE_OAUTH_CALLBACK_URL')}`,
            scope: ['email', 'profile'],
        });
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    async validate(_: string, __: string, profile: Profile): Promise<TSelectUser> {
        const email = profile.emails?.[0];
        if (!email) {
            throw new UnauthorizedException();
        }

        const user = await this.getUserByEmailOrNullService.execute(email.value);

        if (!user) {
            return this.createUserService.execute({
                firstName: profile.name?.givenName,
                lastName: profile.name?.familyName,
                googleId: profile.id,
                email: email.value,
                avatar: profile.photos?.[0]?.value,
                authProvider: AuthProvider.GOOGLE,
                role: UserRoles.USER,
                verifiedAt: getCurrentUTCTimestamp(),
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
                lastLoginAt: getCurrentUTCTimestamp(),
            });
        }

        if (!user.verifiedAt) {
            throw new ProcessFailedForbiddenException();
        }

        if (user.authProvider === AuthProvider.GOOGLE && user.googleId !== profile.id) {
            throw new ProcessFailedForbiddenException();
        }

        return this.updateUserService.execute({
            id: user.id,
            updatedAt: getCurrentUTCTimestamp(),
            lastLoginAt: getCurrentUTCTimestamp(),
        });
    }
}
