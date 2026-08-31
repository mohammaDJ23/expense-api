import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';

import type { ILocalSignupTokenPayload } from '@/modules/authentication/domain/types/localSignupTokenPayload.type';

@Injectable()
export class LocalSignupTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(email: string): string {
        return this.jwtService.sign<ILocalSignupTokenPayload>(
            {
                email,
                type: 'LOCAL_SIGNUP',
                issuedAt: getCurrentUTCTimestamp(),
            },
            { expiresIn: '10m' },
        );
    }

    verify(token: string): ILocalSignupTokenPayload {
        {
            const payload = this.jwtService.verify<ILocalSignupTokenPayload>(token);

            if (payload.type === 'LOCAL_SIGNUP') {
                return payload;
            }
        }
        throw new BadRequestException();
    }
}
