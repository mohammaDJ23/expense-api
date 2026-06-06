import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { Strategy, type Profile } from 'passport-google-oauth20';

import { readSecret } from '@/common/utils/readSecret.util';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
        const env = new Env();
        super({
            clientID: readSecret(env.require('GOOGLE_OAUTH_CLIENT_ID_FILE')),
            clientSecret: readSecret(env.require('GOOGLE_OAUTH_CLIENT_SECRET_FILE')),
            callbackURL: `${env.require('APP_URL')}${env.require('GOOGLE_OAUTH_CALLBACK_URL')}`,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
        accessToken: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
        refreshToken: string,
        profile: Profile,
    ): Promise<TSelectUser> {
        try {
            // find a the user

            // if not exists create a new one

            // if exists just return: user.authProvider === 'local' && !user.googleId

            // Security: check if Email belongs to different Google account: user.authProvider === 'google' && user.googleId !== googleId

            // also update the user lastloginat

            return {};
        } catch {}
    }
}
