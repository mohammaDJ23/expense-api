import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyJoinedBillsConsumersByIdQuery } from '@/modules/consumer/applications/queries/getManyJoinedBillsConsumersById/getManyJoinedBillsConsumersById.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class GetManyJoinedBillsConsumersByIdService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(billId: string, consumerIds: string[]): Promise<TSelectConsumer[]> {
        try {
            const getManyJoinedBillsConsumersByIdQuery = new GetManyJoinedBillsConsumersByIdQuery(
                billId,
                consumerIds,
            );
            return await this.queryBus.execute<
                GetManyJoinedBillsConsumersByIdQuery,
                TSelectConsumer[]
            >(getManyJoinedBillsConsumersByIdQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
