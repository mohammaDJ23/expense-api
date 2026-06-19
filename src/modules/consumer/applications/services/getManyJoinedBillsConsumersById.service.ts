import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyJoinedBillsConsumersByIdQuery } from '@/modules/consumer/applications/queries/getManyJoinedBillsConsumersById/getManyJoinedBillsConsumersById.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IJoinedBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

@Injectable()
export class GetManyJoinedBillsConsumersByIdService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(billIds: string[]): Promise<IJoinedBillConsumer[]> {
        try {
            const getManyJoinedBillsConsumersByIdQuery = new GetManyJoinedBillsConsumersByIdQuery(
                billIds,
            );
            return await this.queryBus.execute<
                GetManyJoinedBillsConsumersByIdQuery,
                IJoinedBillConsumer[]
            >(getManyJoinedBillsConsumersByIdQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
