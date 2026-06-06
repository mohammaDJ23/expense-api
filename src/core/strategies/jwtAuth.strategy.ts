import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { readSecret } from '@/common/utils/readSecret.util';
import { GetUserByIdQuery } from '@/modules/user/applications/queries/getUserById/getUserById.query';

import type { IAccessTokenPayload } from '@/modules/authentication/domain/interfaces/accessTokenPayload.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly queryBus: QueryBus) {
        const env = new Env();
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: readSecret(env.require('JWT_SECRET_FILE')),
        });
    }

    async validate(payload: IAccessTokenPayload): Promise<TSelectUser> {
        const unauthorizedException = new UnauthorizedException();

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (payload.type !== 'ACCESS_TOKEN') {
            throw unauthorizedException;
        }

        let user: TSelectUser | null;
        try {
            const getUserByIdQuery = new GetUserByIdQuery(payload.id);
            user = await this.queryBus.execute<GetUserByIdQuery, TSelectUser | null>(
                getUserByIdQuery,
            );
        } catch {
            throw unauthorizedException;
        }

        if (!user) {
            throw unauthorizedException;
        }

        return user;
    }
}
