import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { TRequiredInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class EmailVerificationTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: TRequiredInsertUser): string {
        try {
            return this.jwtService.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
                {
                    expiresIn: '15m',
                },
            );
        } catch {
            throw new InternalServerErrorException('Failed to create the email verification token');
        }
    }
}
