import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { AccessTokenService } from '@/core/authentication/accessToken.service';
import { FindUserByIdOrThrowQuery } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.query';

import type { ICurrentUser } from '@/core/authentication/currentUser.interface';
import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { Response } from 'express';

@Injectable()
export class GoogleLoginService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    execute(response: Response, user: ICurrentUser): Promise<ISelectUser> {
        {
            const token = this.accessTokenService.sign(user);
            this.accessTokenService.setCookie(response, token);
        }

        return this.queryBus.execute<FindUserByIdOrThrowQuery, ISelectUser>(
            new FindUserByIdOrThrowQuery({
                id: user.id,
            }),
        );
    }
}
