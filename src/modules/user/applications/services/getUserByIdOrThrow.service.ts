import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetUserByIdOrThrowQuery } from '@/modules/user/applications/queries/getUserByIdOrThrow/getUserByIdOrThrow.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class GetUserByIdOrThrowService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(id: string): Promise<TSelectUser> {
        try {
            const getUserByIdOrThrowQuery = new GetUserByIdOrThrowQuery(id);
            return await this.queryBus.execute<GetUserByIdOrThrowQuery, TSelectUser>(
                getUserByIdOrThrowQuery,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
