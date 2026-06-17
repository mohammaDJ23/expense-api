import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetUserByEmailOrNullQuery } from '@/modules/user/applications/queries/getUserByEmailOrNull/getUserByEmailOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class GetUserByEmailOrNullService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(email: string): Promise<TSelectUser | null> {
        try {
            const getUserByEmailOrNullQuery = new GetUserByEmailOrNullQuery(email);
            return await this.queryBus.execute<GetUserByEmailOrNullQuery, TSelectUser | null>(
                getUserByEmailOrNullQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
