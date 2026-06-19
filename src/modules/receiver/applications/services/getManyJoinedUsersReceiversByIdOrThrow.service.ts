import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyJoinedUsersReceiversByIdOrThrowQuery } from '@/modules/receiver/applications/queries/getManyJoinedUsersReceiversByIdOrThrow/getManyJoinedUsersReceiversByIdOrThrow.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class GetManyJoinedUsersReceiversByIdOrThrowService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, receiverIds: string[]): Promise<TSelectReceiver[]> {
        try {
            const getManyJoinedUsersReceiversByIdOrThrowQuery =
                new GetManyJoinedUsersReceiversByIdOrThrowQuery(userId, receiverIds);
            return await this.queryBus.execute<
                GetManyJoinedUsersReceiversByIdOrThrowQuery,
                TSelectReceiver[]
            >(getManyJoinedUsersReceiversByIdOrThrowQuery);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
