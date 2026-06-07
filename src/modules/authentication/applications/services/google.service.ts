import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { AccessTokenService } from '@/modules/authentication/applications/services/accessToken.service';
import { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class GoogleService {
    constructor(private readonly accessTokenService: AccessTokenService) {}

    sign(user: TSelectUser): AccessTokenEntity {
        try {
            const token = this.accessTokenService.sign(user);
            return AccessTokenEntity.create(token);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
