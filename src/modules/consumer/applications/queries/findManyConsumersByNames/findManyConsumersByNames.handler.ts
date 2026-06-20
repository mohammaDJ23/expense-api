import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { FindManyConsumersByNamesQuery } from './findManyConsumersByNames.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(FindManyConsumersByNamesQuery)
export class FindManyConsumersByNamesHandler implements IQueryHandler<FindManyConsumersByNamesQuery> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: FindManyConsumersByNamesQuery): Promise<ISelectConsumer[]> {
        try {
            return await this.consumerRepository.findManyByNames(query.names);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
