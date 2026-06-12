import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { GetManyConsumersByNameQuery } from './getManyConsumersByName.query';

import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(GetManyConsumersByNameQuery)
export class GetManyConsumersByNameHandler implements IQueryHandler<GetManyConsumersByNameQuery> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    execute(query: GetManyConsumersByNameQuery): Promise<TSelectConsumer[]> {
        return this.consumerRepository.getManyByName(query.names);
    }
}
