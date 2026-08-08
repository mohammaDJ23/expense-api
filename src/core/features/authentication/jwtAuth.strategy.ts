import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { accessTokenExtractor } from '@/core/features/accessToken/accessToken.extractor';
import { AccessTokenService } from '@/core/features/accessToken/accessToken.service';
import { readSecret } from '@/core/utils/readSecret.util';
import { FindUserByIdOrNullQuery } from '@/modules/user/applications/queries/findUserByIdOrNull/findUserByIdOrNull.query';

import type { IAccessTokenPayload } from '@/core/features/accessToken/accessTokenPayload.type';
import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly queryBus: QueryBus,
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

        const user = await this.queryBus.execute<FindUserByIdOrNullQuery, ISelectUser | null>(
            new FindUserByIdOrNullQuery({
                id: verifiedPayload.id,
            }),
        );

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!user.verifiedAt) {
            throw new ForbiddenException();
        }

        return {
            id: user.id,
            role: user.role,
        };
    }
}
