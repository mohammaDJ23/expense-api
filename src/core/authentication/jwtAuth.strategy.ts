import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { readSecret } from '@/common/utils/readSecret.util';
import { FindUserByIdOrNullQuery } from '@/modules/user/applications/queries/findUserByIdOrNull/findUserByIdOrNull.query';

import { accessTokenExtractor } from './accessToken.extractor';

import type { ICurrentUser } from './currentUser.interface';
import type { IAccessTokenPayload } from '@/modules/authentication/domain/interfaces/accessTokenPayload.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly queryBus: QueryBus) {
        const env = new Env();
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([accessTokenExtractor]),
            ignoreExpiration: false,
            secretOrKey: readSecret(env.require('JWT_SECRET_FILE')),
        });
    }

    async validate(payload: IAccessTokenPayload): Promise<ICurrentUser> {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (payload.type !== 'ACCESS_TOKEN') {
            throw new UnauthorizedException();
        }

        {
            const user = await this.queryBus.execute<FindUserByIdOrNullQuery, ISelectUser | null>(
                new FindUserByIdOrNullQuery({
                    id: payload.id,
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
}
