import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AccessTokenService } from '@/core/features/accessToken/accessToken.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateOauthAccountCommand } from '@/modules/authentication/applications/commands/updateOauthAccount/updateOauthAccount.command';

import type { IOauthCurrentUser } from '@/core/features/oauthCurrentUser/oauthCurrentUser.type';
import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { Response } from 'express';

interface IInput {
    response: Response;
    user: IOauthCurrentUser;
}

@Injectable()
export class OauthLoginService implements IService<IInput, boolean> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    async execute(input: IInput): Promise<boolean> {
        {
            const token = this.accessTokenService.sign({
                id: input.user.id,
                role: input.user.role,
            });
            this.accessTokenService.setCookie(input.response, token);
        }

        {
            const creationTime = getCurrentUTCTimestamp();
            await this.commandBus.execute<UpdateOauthAccountCommand, ISelectLocalAccount>(
                new UpdateOauthAccountCommand({
                    id: input.user.oauthAccountId,
                    lastLoginAt: creationTime,
                    updatedAt: creationTime,
                }),
            );
        }

        return true;
    }
}
