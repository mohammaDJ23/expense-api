import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { FindUserConsumerByRefIdAndTargetIdOrNullQuery } from './findUserConsumerByRefIdAndTargetIdOrNull.query';

import type { ISelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@QueryHandler(FindUserConsumerByRefIdAndTargetIdOrNullQuery)
export class FindUserConsumerByRefIdAndTargetIdOrNullHandler implements IQueryHandler<FindUserConsumerByRefIdAndTargetIdOrNullQuery> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    async execute(
        query: FindUserConsumerByRefIdAndTargetIdOrNullQuery,
    ): Promise<ISelectUserConsumer | null> {
        try {
            return await this.userConsumerRepository.findByRefIdAndTargetIdOrNull(
                query.userId,
                query.consumerId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
