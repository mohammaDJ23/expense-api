import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';

import type { ILocalAccountTokenPayload } from '@/modules/authentication/domain/types/localAccountTokenPayload.type';

@Injectable()
export class LocalAccountTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(email: string): string {
        return this.jwtService.sign<ILocalAccountTokenPayload>(
            {
                email,
                type: 'LOCAL_ACCOUNT',
                issuedAt: getCurrentUTCTimestamp(),
            },
            { expiresIn: '10m' },
        );
    }

    verify(token: string): ILocalAccountTokenPayload {
        {
            const payload = this.jwtService.verify<ILocalAccountTokenPayload>(token);

            if (payload.type === 'LOCAL_ACCOUNT') {
                return payload;
            }
        }
        throw new BadRequestException();
    }
}
