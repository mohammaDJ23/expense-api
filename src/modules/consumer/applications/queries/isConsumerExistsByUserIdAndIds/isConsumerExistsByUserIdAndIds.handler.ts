import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { IsConsumerExistsByUserIdAndIdsQuery } from './isConsumerExistsByUserIdAndIds.query';

@QueryHandler(IsConsumerExistsByUserIdAndIdsQuery)
export class IsConsumerExistsByUserIdAndIdsHandler implements IQueryHandler<
    IsConsumerExistsByUserIdAndIdsQuery,
    boolean
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: IsConsumerExistsByUserIdAndIdsQuery): Promise<boolean> {
        try {
            return await this.consumerRepository.isExistsByUserIdAndIds(
                query.userId,
                query.consumerIds,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
