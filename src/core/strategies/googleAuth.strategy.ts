import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { Strategy, type Profile } from 'passport-google-oauth20';

import { readSecret } from '@/common/utils/readSecret.util';
import { ProcessFailedForbiddenException } from '@/core/exceptions/processFailedForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { GetUserByEmailQuery } from '@/modules/user/applications/queries/getUserByEmail/getUserByEmail.query';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

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

    // eslint-disable-next-line @typescript-eslint/naming-convention
    async validate(_: string, __: string, profile: Profile): Promise<TSelectUser> {
        const email = profile.emails?.[0];
        if (!email) {
            throw new UnauthorizedException();
        }

        let user: TSelectUser | null;
        try {
            const getUserByEmailQuery = new GetUserByEmailQuery(email.value);
            user = await this.queryBus.execute<GetUserByEmailQuery, TSelectUser | null>(
                getUserByEmailQuery,
            );

            if (!user) {
                const createUserCommand = new CreateUserCommand({
                    firstName: profile.name?.givenName,
                    lastName: profile.name?.familyName,
                    googleId: profile.id,
                    email: email.value,
                    avatar: profile.photos?.[0]?.value,
                    authProvider: AuthProvider.GOOGLE,
                    role: UserRoles.USER,
                    verifiedAt: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    lastLoginAt: new Date(),
                });
                return await this.commandBus.execute<CreateUserCommand, TSelectUser>(
                    createUserCommand,
                );
            }
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        if (!user.verifiedAt) {
            throw new ProcessFailedForbiddenException();
        }

        if (user.authProvider === AuthProvider.GOOGLE && user.googleId !== profile.id) {
            throw new ProcessFailedForbiddenException();
        }

        try {
            const updateUserCommand = new UpdateUserCommand({
                id: user.id,
                updatedAt: new Date(),
                lastLoginAt: new Date(),
            });
            return await this.commandBus.execute<UpdateUserCommand, TSelectUser>(updateUserCommand);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
