import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IVerificationPayload } from '@/modules/authentication/domain/interfaces/verificationPayload.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class VerificationTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: ISelectUser): string {
        return this.jwtService.sign<IVerificationPayload>(
            {
                id: user.id,
                email: user.email,
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
