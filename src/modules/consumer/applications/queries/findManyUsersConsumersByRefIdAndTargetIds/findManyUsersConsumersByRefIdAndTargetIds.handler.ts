import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { FindManyUsersConsumersByRefIdAndTargetIdsQuery } from './findManyUsersConsumersByRefIdAndTargetIds.query';

import type { ISelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@QueryHandler(FindManyUsersConsumersByRefIdAndTargetIdsQuery)
export class FindManyUsersConsumersByRefIdAndTargetIdsHandler implements IQueryHandler<FindManyUsersConsumersByRefIdAndTargetIdsQuery> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    async execute(
        query: FindManyUsersConsumersByRefIdAndTargetIdsQuery,
    ): Promise<ISelectUserConsumer[]> {
        try {
            return await this.userConsumerRepository.findManyByRefIdAndTargetIds(
                query.userId,
                query.consumerIds,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
