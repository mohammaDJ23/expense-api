import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IAccessTokenPayload } from '@/modules/authentication/domain/interfaces/accessTokenPayload.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class AccessTokenService implements IServiceHandler {
    constructor(private readonly jwtService: JwtService) {}

    execute(user: TSelectUser): string {
        return this.jwtService.sign<IAccessTokenPayload>(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                phone: user.phone,
                verifiedAt: user.verifiedAt,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                lastLoginAt: user.lastLoginAt,
                googleId: user.googleId,
                authProvider: user.authProvider,
                type: 'ACCESS_TOKEN',
                issuedAt: getCurrentUTCTimestamp(),
            },
            { expiresIn: '1d' },
        );
    }
}
