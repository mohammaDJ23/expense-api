import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';

import { GetManyJoinedBillsConsumersByIdOrThrowQuery } from './getManyJoinedBillsConsumersByIdOrThrow.query';

import type { IJoinedBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

@QueryHandler(GetManyJoinedBillsConsumersByIdOrThrowQuery)
export class GetManyJoinedBillsConsumersByIdOrThrowHandler implements IQueryHandler<GetManyJoinedBillsConsumersByIdOrThrowQuery> {
    constructor(private readonly billConsumerRepository: BillConsumerRepository) {}

    execute(query: GetManyJoinedBillsConsumersByIdOrThrowQuery): Promise<IJoinedBillConsumer[]> {
        return this.billConsumerRepository.getManyJoinedByIdOrThrow(query.billIds);
    }
}
