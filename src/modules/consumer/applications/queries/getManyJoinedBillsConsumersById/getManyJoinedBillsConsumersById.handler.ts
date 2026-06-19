import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';

import { GetManyJoinedBillsConsumersByIdQuery } from './getManyJoinedBillsConsumersById.query';

import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(GetManyJoinedBillsConsumersByIdQuery)
export class GetManyJoinedBillsConsumersByIdHandler implements IQueryHandler<GetManyJoinedBillsConsumersByIdQuery> {
    constructor(private readonly billConsumerRepository: BillConsumerRepository) {}

    execute(query: GetManyJoinedBillsConsumersByIdQuery): Promise<TSelectConsumer[]> {
        return this.billConsumerRepository.getManyJoinedById(query.billId);
    }
}
