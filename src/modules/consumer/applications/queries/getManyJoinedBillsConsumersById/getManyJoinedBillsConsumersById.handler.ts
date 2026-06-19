import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';

import { GetManyJoinedBillsConsumersByIdQuery } from './getManyJoinedBillsConsumersById.query';

import type { IJoinedBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

@QueryHandler(GetManyJoinedBillsConsumersByIdQuery)
export class GetManyJoinedBillsConsumersByIdHandler implements IQueryHandler<GetManyJoinedBillsConsumersByIdQuery> {
    constructor(private readonly billConsumerRepository: BillConsumerRepository) {}

    execute(query: GetManyJoinedBillsConsumersByIdQuery): Promise<IJoinedBillConsumer[]> {
        return this.billConsumerRepository.getManyJoinedById(query.billIds);
    }
}
