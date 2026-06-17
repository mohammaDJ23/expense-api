import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetUserByIdOrNullQuery } from '@/modules/user/applications/queries/getUserByIdOrNull/getUserByIdOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class GetUserByIdOrNullService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(id: string): Promise<TSelectUser | null> {
        try {
            const getUserByIdOrNullQuery = new GetUserByIdOrNullQuery(id);
            return await this.queryBus.execute<GetUserByIdOrNullQuery, TSelectUser | null>(
                getUserByIdOrNullQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
