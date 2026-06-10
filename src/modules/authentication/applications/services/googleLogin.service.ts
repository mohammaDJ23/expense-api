import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';

import { AccessTokenService } from './accessToken.service';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class GoogleLoginService {
    constructor(private readonly accessTokenService: AccessTokenService) {}

    login(user: TSelectUser): AccessTokenEntity {
        try {
            const token = this.accessTokenService.sign(user);
            return AccessTokenEntity.create(token);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
