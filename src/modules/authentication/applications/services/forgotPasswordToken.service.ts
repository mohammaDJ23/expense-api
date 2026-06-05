import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IForgotPasswordPayload } from '@/modules/authentication/domain/interfaces/forgotPasswordPayload.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class ForgotPasswordTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: TSelectUser): string {
        return this.jwtService.sign<IForgotPasswordPayload>(
            {
                id: user.id,
                email: user.email,
                type: 'FORGOT_PASSWORD',
                issuedAt: getCurrentUTCTimestamp(),
            },
            { expiresIn: '10m' },
        );
    }

    verify(token: string): IForgotPasswordPayload {
        const payload = this.jwtService.verify<IForgotPasswordPayload>(token);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (payload.type === 'FORGOT_PASSWORD') {
            return payload;
        }
        throw new BadRequestException('The forgot password token is not valid');
    }
}
