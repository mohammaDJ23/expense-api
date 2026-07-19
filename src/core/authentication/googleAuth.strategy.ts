import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { Strategy, type Profile } from 'passport-google-oauth20';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { readSecret } from '@/common/utils/readSecret.util';
import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { FindUserByEmailOrNullQuery } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import type { ICurrentUser } from './currentUser.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
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
    async validate(_: string, __: string, profile: Profile): Promise<ICurrentUser> {
        const email = profile.emails?.[0];
        if (!email) {
            throw new UnauthorizedException();
        }

        const user = await this.queryBus.execute<FindUserByEmailOrNullQuery, ISelectUser | null>(
            new FindUserByEmailOrNullQuery({
                email: email.value,
            }),
        );

        if (!user) {
            const createdUser = await this.commandBus.execute<CreateUserCommand, ISelectUser>(
                new CreateUserCommand({
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
                }),
            );

            return {
                id: createdUser.id,
                role: createdUser.role,
            };
        }

        if (!user.verifiedAt) {
            throw new ForbiddenException();
        }

        if (user.authProvider !== AuthProvider.GOOGLE) {
            throw new ForbiddenException();
        }

        if (user.authProvider === AuthProvider.GOOGLE && user.googleId !== profile.id) {
            throw new ForbiddenException();
        }

        return {
            id: user.id,
            role: user.role,
        };
    }
}
