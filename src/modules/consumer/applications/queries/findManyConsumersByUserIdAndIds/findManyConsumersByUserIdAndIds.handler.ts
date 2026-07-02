import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { FindManyConsumersByUserIdAndIdsQuery } from './findManyConsumersByUserIdAndIds.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(FindManyConsumersByUserIdAndIdsQuery)
export class FindManyConsumersByUserIdAndIdsHandler implements IQueryHandler<
    FindManyConsumersByUserIdAndIdsQuery,
    ISelectConsumer[]
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: FindManyConsumersByUserIdAndIdsQuery): Promise<ISelectConsumer[]> {
        try {
            return await this.consumerRepository.findManyByUserIdAndIds(
                query.props.userId,
                query.props.ids,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
