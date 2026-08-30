import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';

import type { IVerificationPayload } from '@/modules/authentication/domain/types/verificationPayload.type';

@Injectable()
export class VerificationTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(email: string): string {
        return this.jwtService.sign<IVerificationPayload>(
            {
                email,
                type: 'VERIFICATION',
                issuedAt: getCurrentUTCTimestamp(),
            },
            { expiresIn: '10m' },
        );
    }

    verify(token: string): IVerificationPayload {
        {
            const payload = this.jwtService.verify<IVerificationPayload>(token);

            if (payload.type === 'VERIFICATION') {
                return payload;
            }
        }
        throw new BadRequestException();
    }
}
