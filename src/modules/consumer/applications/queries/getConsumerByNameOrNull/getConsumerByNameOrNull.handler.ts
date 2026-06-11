import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetConsumerByNameOrNullQuery } from './getConsumerByNameOrNull.query';

import type { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(GetConsumerByNameOrNullQuery)
export class GetConsumerByNameOrNullHandler implements IQueryHandler<GetConsumerByNameOrNullQuery> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    execute(query: GetConsumerByNameOrNullQuery): Promise<TSelectConsumer | null> {
        return this.consumerRepository.getByNameOrNull(query.name);
    }
}
