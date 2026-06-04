import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { VerificationPayloadEntity } from '@/modules/authentication/domain/entities/verificationPayload.entity';

import type { IVerificationPayload } from '@/modules/authentication/domain/interfaces/verificationPayload.interface';
import type { TInsertUser, TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class VerificationTokenService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user: TInsertUser | TSelectUser): string {
        try {
            const entity = VerificationPayloadEntity.create({
                id: user.id,
                email: user.email,
            });
            return this.jwtService.sign<IVerificationPayload>(entity, { expiresIn: '10m' });
        } catch {
            throw new InternalServerErrorException('Failed to create the email verification token');
        }
    }

    verify(token: string): IVerificationPayload {
        try {
            return this.jwtService.verify<IVerificationPayload>(token);
        } catch {
            throw new BadRequestException('Failed to verify the email verification token');
        }
    }
}
