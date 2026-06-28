import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { FindConsumerByUserIdAndNameOrNullQuery } from './findConsumerByUserIdAndNameOrNull.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(FindConsumerByUserIdAndNameOrNullQuery)
export class FindConsumerByUserIdAndNameOrNullHandler implements IQueryHandler<
    FindConsumerByUserIdAndNameOrNullQuery,
    ISelectConsumer | null
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: FindConsumerByUserIdAndNameOrNullQuery): Promise<ISelectConsumer | null> {
        try {
            return await this.consumerRepository.findByUserIdAndNameOrNull(
                query.userId,
                query.name,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
