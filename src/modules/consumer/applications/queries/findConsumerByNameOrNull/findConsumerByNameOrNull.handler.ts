import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { FindConsumerByNameOrNullQuery } from './findConsumerByNameOrNull.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(FindConsumerByNameOrNullQuery)
export class FindConsumerByNameOrNullHandler implements IQueryHandler<FindConsumerByNameOrNullQuery> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: FindConsumerByNameOrNullQuery): Promise<ISelectConsumer | null> {
        try {
            return await this.consumerRepository.findByNameOrNull(query.name);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
