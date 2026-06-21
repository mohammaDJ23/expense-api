import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';

import { AccessTokenService } from './accessToken.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class GoogleLoginService implements IServiceHandler {
    constructor(private readonly accessTokenService: AccessTokenService) {}

    execute(user: ISelectUser): AccessTokenEntity {
        try {
            const token = this.accessTokenService.execute(user);
            return AccessTokenEntity.create(token);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
