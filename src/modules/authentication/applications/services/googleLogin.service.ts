import { Injectable } from '@nestjs/common';

import { AccessTokenService } from '@/core/features/accessToken/accessToken.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateUserService } from '@/modules/user/applications/services/updateUser.service';

import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { Response } from 'express';

interface IInput {
    response: Response;
    user: ICurrentUser;
}

@Injectable()
export class GoogleLoginService implements IService<IInput, ISelectUser> {
    constructor(
        private readonly accessTokenService: AccessTokenService,
        private readonly updateUserService: UpdateUserService,
    ) {}

    execute(input: IInput): Promise<ISelectUser> {
        {
            const token = this.accessTokenService.sign(input.user);
            this.accessTokenService.setCookie(input.response, token);
        }

        return this.updateUserService.execute({
            id: input.user.id,
            updatedAt: getCurrentUTCTimestamp(),
            lastLoginAt: getCurrentUTCTimestamp(),
        });
    }
}
