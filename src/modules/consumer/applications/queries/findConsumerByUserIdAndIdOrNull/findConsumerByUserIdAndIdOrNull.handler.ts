import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';

import { FindConsumerByUserIdAndIdOrNullQuery } from './findConsumerByUserIdAndIdOrNull.query';

import type { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(FindConsumerByUserIdAndIdOrNullQuery)
export class FindConsumerByUserIdAndIdOrNullHandler implements IQueryHandler<
    FindConsumerByUserIdAndIdOrNullQuery,
    ISelectConsumer | null
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: FindConsumerByUserIdAndIdOrNullQuery): Promise<ISelectConsumer | null> {
        try {
            return await this.consumerRepository.findByUserIdAndIdOrNull(
                query.userId,
                query.consumerId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
