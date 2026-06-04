import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IEmailVerificationTokenPayload } from '@/modules/authentication/domain/interfaces/emailVerificationTokenPayload.interface';
import type { TInsertUser, TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class EmailVerificationTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: TInsertUser | TSelectUser): string {
        try {
            return this.jwtService.sign<IEmailVerificationTokenPayload>(
                {
                    id: user.id,
                    email: user.email,
                    issuedAt: getCurrentUTCTimestamp(),
                },
                {
                    expiresIn: '10m',
                },
            );
        } catch {
            throw new InternalServerErrorException('Failed to create the email verification token');
        }
    }

    verify(token: string): IEmailVerificationTokenPayload {
        try {
            return this.jwtService.verify<IEmailVerificationTokenPayload>(token);
        } catch {
            throw new BadRequestException('Failed to verify the email verification token');
        }
    }
}
