import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IVerificationPayload } from '@/modules/authentication/domain/interfaces/verificationPayload.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class VerificationTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: TSelectUser): string {
        return this.jwtService.sign<IVerificationPayload>(
            {
                id: user.id,
                email: user.email,
                type: 'VERIFICATION',
                issuedAt: getCurrentUTCTimestamp(),
            },
            // this time should be syncing with the ttl of redis
            { expiresIn: '10m' },
        );
    }

    verify(token: string): IVerificationPayload {
        const payload = this.jwtService.verify<IVerificationPayload>(token);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (payload.type === 'VERIFICATION') {
            return payload;
        }
        throw new BadRequestException('The verification token is not valid');
    }
}
