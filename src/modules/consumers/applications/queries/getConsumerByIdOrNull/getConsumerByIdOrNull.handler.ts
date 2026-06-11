import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetConsumerByIdOrNullQuery } from './getConsumerByIdOrNull.query';

import type { ConsumerRepository } from '@/modules/consumers/infrastructure/repositories/consumer.repository';
import type { TSelectConsumer } from '@/modules/consumers/infrastructure/schemas/consumer.schema';

@QueryHandler(GetConsumerByIdOrNullQuery)
export class GetConsumerByIdOrNullHandler implements IQueryHandler<GetConsumerByIdOrNullQuery> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    execute(query: GetConsumerByIdOrNullQuery): Promise<TSelectConsumer | null> {
        return this.consumerRepository.getByIdOrNull(query.id);
    }
}
