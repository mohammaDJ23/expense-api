import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { FindUserConsumerTargetByRefIdAndTargetIdOrThrowQuery } from './findUserConsumerTargetByRefIdAndTargetIdOrThrow.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(FindUserConsumerTargetByRefIdAndTargetIdOrThrowQuery)
export class FindUserConsumerTargetByRefIdAndTargetIdOrThrowHandler implements IQueryHandler<
    FindUserConsumerTargetByRefIdAndTargetIdOrThrowQuery,
    ISelectConsumer
> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    async execute(
        query: FindUserConsumerTargetByRefIdAndTargetIdOrThrowQuery,
    ): Promise<ISelectConsumer> {
        try {
            return await this.userConsumerRepository.findTargetByRefIdAndTargetIdOrThrow(
                query.userId,
                query.consumerId,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
