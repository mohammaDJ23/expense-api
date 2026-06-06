import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { INewPasswordPayload } from '@/modules/authentication/domain/interfaces/newPasswordPayload.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class PasswordTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: TSelectUser): string {
        return this.jwtService.sign<INewPasswordPayload>(
            {
                id: user.id,
                email: user.email,
                type: 'NEW_PASSWORD',
                issuedAt: getCurrentUTCTimestamp(),
            },
            // this time should be syncing with the ttl of redis
            { expiresIn: '10m' },
        );
    }

    verify(token: string): INewPasswordPayload {
        const payload = this.jwtService.verify<INewPasswordPayload>(token);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (payload.type === 'NEW_PASSWORD') {
            return payload;
        }
        throw new BadRequestException('The new password token is not valid');
    }
}
