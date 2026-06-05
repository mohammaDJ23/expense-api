import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IAccessTokenPayload } from '@/modules/authentication/domain/interfaces/accessTokenPayload.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class AccessTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: TSelectUser): string {
        try {
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
                    issuedAt: getCurrentUTCTimestamp(),
                },
                { expiresIn: '1d' },
            );
        } catch {
            throw new InternalServerErrorException('Failed to create an access token');
        }
    }
}
