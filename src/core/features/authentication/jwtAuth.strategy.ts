import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { accessTokenExtractor } from '@/core/features/accessToken/accessToken.extractor';
import { AccessTokenService } from '@/core/features/accessToken/accessToken.service';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { readSecret } from '@/core/utils/readSecret.util';
import { FindEmailIdentityByUserIdrNullQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByUserIdOrNull/findEmailIdentityByUserIdOrNull.query';
import { FindLocalAccountByEmailIdOrNullQuery } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.query';
import { FindOauthAccountByEmailIdOrNullQuery } from '@/modules/authentication/applications/queries/findOauthAccountByEmailIdOrNull/findOauthAccountByEmailIdOrNull.query';
import { FindUserByIdOrNullQuery } from '@/modules/user/applications/queries/findUserByIdOrNull/findUserByIdOrNull.query';

import type { IAccessTokenPayload } from '@/core/features/accessToken/accessTokenPayload.type';
import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { ISelectOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly queryDispatcher: QueryDispatcher,
        private readonly accessTokenService: AccessTokenService,
    ) {
        const env = new Env();
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([accessTokenExtractor]),
            ignoreExpiration: false,
            secretOrKey: readSecret(env.require('JWT_SECRET_FILE')),
        });
    }

    async validate(payload: IAccessTokenPayload): Promise<ICurrentUser> {
        const verifiedPayload = this.accessTokenService.verify(payload);

        const user = await this.queryDispatcher.execute<
            FindUserByIdOrNullQuery,
            ISelectUser | null
        >(
            new FindUserByIdOrNullQuery({
                id: verifiedPayload.id,
            }),
        );

        if (!user) {
            throw new UnauthorizedException();
        }

        const emailIdentity = await this.queryBus.execute<
            FindEmailIdentityByUserIdrNullQuery,
            ISelectEmailIdentity | null
        >(
            new FindEmailIdentityByUserIdrNullQuery({
                userId: user.id,
            }),
        );

        if (!emailIdentity) {
            throw new UnauthorizedException();
        }

        const localAccount = await this.queryBus.execute<
            FindLocalAccountByEmailIdOrNullQuery,
            ISelectLocalAccount | null
        >(
            new FindLocalAccountByEmailIdOrNullQuery({
                emailId: emailIdentity.id,
            }),
        );

        if (localAccount) {
            if (!localAccount.verifiedAt) {
                throw new ForbiddenException();
            }

            return {
                id: user.id,
                role: user.role,
            };
        }

        const oauthAccount = await this.queryBus.execute<
            FindOauthAccountByEmailIdOrNullQuery,
            ISelectOauthAccount | null
        >(
            new FindOauthAccountByEmailIdOrNullQuery({
                emailId: emailIdentity.id,
            }),
        );

        if (oauthAccount) {
            if (!oauthAccount.verifiedAt) {
                throw new ForbiddenException();
            }

            return {
                id: user.id,
                role: user.role,
            };
        }

        throw new UnauthorizedException();
    }
}
