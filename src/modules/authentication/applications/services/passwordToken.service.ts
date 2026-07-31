import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';

import type { INewPasswordPayload } from '@/modules/authentication/domain/types/newPasswordPayload.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class PasswordTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: ISelectUser): string {
        return this.jwtService.sign<INewPasswordPayload>(
            {
                id: user.id,
                email: user.email,
                type: 'NEW_PASSWORD',
                issuedAt: getCurrentUTCTimestamp(),
            },
            { expiresIn: '10m' },
        );
    }

    verify(token: string): INewPasswordPayload {
        {
            const payload = this.jwtService.verify<INewPasswordPayload>(token);

            if (payload.type === 'NEW_PASSWORD') {
                return payload;
            }
        }
        throw new BadRequestException();
    }
}
