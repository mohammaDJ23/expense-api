import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';

import type { INewPasswordTokenPayload } from '@/modules/authentication/domain/types/newPasswordTokenPayload.type';

@Injectable()
export class PasswordTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(email: string): string {
        return this.jwtService.sign<INewPasswordTokenPayload>(
            {
                email,
                type: 'NEW_PASSWORD',
                issuedAt: getCurrentUTCTimestamp(),
            },
            { expiresIn: '10m' },
        );
    }

    verify(token: string): INewPasswordTokenPayload {
        {
            const payload = this.jwtService.verify<INewPasswordTokenPayload>(token);

            if (payload.type === 'NEW_PASSWORD') {
                return payload;
            }
        }
        throw new BadRequestException();
    }
}
