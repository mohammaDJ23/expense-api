import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AccessTokenService } from '@/core/authentication/accessToken.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';

import type { ICurrentUser } from '@/core/authentication/currentUser.interface';
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
        private readonly commandBus: CommandBus,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    execute(input: IInput): Promise<ISelectUser> {
        {
            const token = this.accessTokenService.sign(input.user);
            this.accessTokenService.setCookie(input.response, token);
        }

        return this.commandBus.execute<UpdateUserCommand, ISelectUser>(
            new UpdateUserCommand({
                id: input.user.id,
                updatedAt: getCurrentUTCTimestamp(),
                lastLoginAt: getCurrentUTCTimestamp(),
            }),
        );
    }
}
