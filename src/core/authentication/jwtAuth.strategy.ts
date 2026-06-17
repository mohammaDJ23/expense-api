import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from '@humanwhocodes/env';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { readSecret } from '@/common/utils/readSecret.util';
import { GetUserByIdOrNullService } from '@/modules/user/applications/services/getUserByIdOrNull.service';

import type { IAccessTokenPayload } from '@/modules/authentication/domain/interfaces/accessTokenPayload.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly getUserByIdOrNullService: GetUserByIdOrNullService) {
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

        const user = await this.getUserByIdOrNullService.execute(payload.id);

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!user.verifiedAt) {
            throw new ForbiddenException();
        }

        return user;
    }
}
