import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { GetUserByIdQuery } from '@/modules/user/applications/queries/getUserById/getUserById.query';

import type { IAccessTokenPayload } from '@/modules/authentication/domain/interfaces/accessTokenPayload.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly queryBus: QueryBus) {
        const env = new Env();
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: env.require('JWT_SECRET_FILE'),
        });
    }

    async validate(payload: IAccessTokenPayload): Promise<TSelectUser> {
        const getUserByIdQuery = new GetUserByIdQuery(payload.id);
        const user = await this.queryBus.execute<GetUserByIdQuery, TSelectUser | null>(
            getUserByIdQuery,
        );
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
