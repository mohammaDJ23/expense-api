import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyJoinedUsersReceiversByIdQuery } from '@/modules/receiver/applications/queries/getManyJoinedUsersReceiversById/getManyJoinedUsersReceiversById.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class GetManyJoinedUsersReceiversByIdService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, receiverIds: string[]): Promise<TSelectReceiver[]> {
        try {
            const getManyJoinedUsersReceiversByIdQuery = new GetManyJoinedUsersReceiversByIdQuery(
                userId,
                receiverIds,
            );
            return await this.queryBus.execute<
                GetManyJoinedUsersReceiversByIdQuery,
                TSelectReceiver[]
            >(getManyJoinedUsersReceiversByIdQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
