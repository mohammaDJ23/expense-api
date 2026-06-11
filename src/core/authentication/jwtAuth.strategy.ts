import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { readSecret } from '@/common/utils/readSecret.util';
import { ProcessFailedForbiddenException } from '@/core/exceptions/processFailedForbidden.exception';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetUserByIdOrNullQuery } from '@/modules/user/applications/queries/getUserByIdOrNull/getUserByIdOrNull.query';

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
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (payload.type !== 'ACCESS_TOKEN') {
            throw new UnauthorizedException();
        }

        let user: TSelectUser | null;
        try {
            const getUserByIdOrNullQuery = new GetUserByIdOrNullQuery(payload.id);
            user = await this.queryBus.execute<GetUserByIdOrNullQuery, TSelectUser | null>(
                getUserByIdOrNullQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!user.verifiedAt) {
            throw new ProcessFailedForbiddenException();
        }

        return user;
    }
}
