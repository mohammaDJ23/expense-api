import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyUsersConsumersByIdQuery } from '@/modules/consumer/applications/queries/getManyUsersConsumersById/getManyUsersConsumersById.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@Injectable()
export class GetManyUsersConsumersByIdService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, consumerIds: string[]): Promise<TSelectUserConsumer[]> {
        try {
            const getManyUsersConsumersByIdQuery = new GetManyUsersConsumersByIdQuery(
                userId,
                consumerIds,
            );
            return await this.queryBus.execute<
                GetManyUsersConsumersByIdQuery,
                TSelectUserConsumer[]
            >(getManyUsersConsumersByIdQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
