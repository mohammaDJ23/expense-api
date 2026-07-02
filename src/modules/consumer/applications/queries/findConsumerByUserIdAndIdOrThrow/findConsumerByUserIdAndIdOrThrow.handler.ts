import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { FindConsumerByUserIdAndIdOrThrowQuery } from './findConsumerByUserIdAndIdOrThrow.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(FindConsumerByUserIdAndIdOrThrowQuery)
export class FindConsumerByUserIdAndIdOrThrowHandler implements IQueryHandler<
    FindConsumerByUserIdAndIdOrThrowQuery,
    ISelectConsumer
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: FindConsumerByUserIdAndIdOrThrowQuery): Promise<ISelectConsumer> {
        try {
            return await this.consumerRepository.findByUserIdAndIdOrThrow(
                query.props.userId,
                query.props.id,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
