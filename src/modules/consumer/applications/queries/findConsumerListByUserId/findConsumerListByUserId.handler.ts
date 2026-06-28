import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { FindConsumerListByUserIdQuery } from './findConsumerListByUserId.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(FindConsumerListByUserIdQuery)
export class FindConsumerListByUserIdHandler implements IQueryHandler<
    FindConsumerListByUserIdQuery,
    ISelectConsumer[]
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: FindConsumerListByUserIdQuery): Promise<ISelectConsumer[]> {
        try {
            return await this.consumerRepository.findListByUserId(query.userId, {
                offset: query.offset,
                limit: query.limit,
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
