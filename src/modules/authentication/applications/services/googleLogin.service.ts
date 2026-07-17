import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { AccessTokenService } from '@/core/authentication/accessToken.service';
import { FindUserByIdOrThrowQuery } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.query';

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
        private readonly queryBus: QueryBus,
        private readonly accessTokenService: AccessTokenService,
    ) {}

    execute(input: IInput): Promise<ISelectUser> {
        {
            const token = this.accessTokenService.sign(input.user);
            this.accessTokenService.setCookie(input.response, token);
        }

        return this.queryBus.execute<FindUserByIdOrThrowQuery, ISelectUser>(
            new FindUserByIdOrThrowQuery({
                id: input.user.id,
            }),
        );
    }
}
