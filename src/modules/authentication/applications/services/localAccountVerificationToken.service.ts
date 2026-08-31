import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';

import type { ILocalAccountVerificationTokenPayload } from '@/modules/authentication/domain/types/localAccountVerificationTokenPayload.type';

@Injectable()
export class LocalAccountVerificationTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(email: string): string {
        return this.jwtService.sign<ILocalAccountVerificationTokenPayload>(
            {
                email,
                type: 'LOCAL_ACCOUNT_VERIFICATION',
                issuedAt: getCurrentUTCTimestamp(),
            },
            { expiresIn: '10m' },
        );
    }

    verify(token: string): ILocalAccountVerificationTokenPayload {
        {
            const payload = this.jwtService.verify<ILocalAccountVerificationTokenPayload>(token);

            if (payload.type === 'LOCAL_ACCOUNT_VERIFICATION') {
                return payload;
            }
        }
        throw new BadRequestException();
    }
}
