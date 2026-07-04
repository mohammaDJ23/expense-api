import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { ICurrentUser } from '@/core/authentication/currentUser.interface';
import type { IAccessTokenPayload } from '@/modules/authentication/domain/interfaces/accessTokenPayload.interface';
import type { Response } from 'express';

@Injectable()
export class AccessTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: ICurrentUser): string {
        return this.jwtService.sign<IAccessTokenPayload>(
            {
                id: user.id,
                role: user.role,
                type: 'ACCESS_TOKEN',
                issuedAt: getCurrentUTCTimestamp(),
            },
            { expiresIn: '1d' },
        );
    }

    verify(payload: IAccessTokenPayload): IAccessTokenPayload {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (payload.type === 'ACCESS_TOKEN') {
            return payload;
        }
        throw new UnauthorizedException();
    }

    setCookie(response: Response, accessToken: string): void {
        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
        });
    }
}
