import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type {
    TRequiredInsertUser,
    TSelectUser,
} from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class EmailVerificationTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: TRequiredInsertUser | TSelectUser): string {
        try {
            return this.jwtService.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    issuedAt: getCurrentUTCTimestamp(),
                },
                {
                    // NOTICE: this timer should match with the redis cache expiration time
                    expiresIn: '15m',
                },
            );
        } catch {
            throw new InternalServerErrorException('Failed to create the email verification token');
        }
    }
}
