import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { IsUserConsumerExistsByRefIdAndTargetIdsQuery } from './isUserConsumerExistsByRefIdAndTargetIds.query';

@QueryHandler(IsUserConsumerExistsByRefIdAndTargetIdsQuery)
export class IsUserConsumerExistsByRefIdAndTargetIdsHandler implements IQueryHandler<IsUserConsumerExistsByRefIdAndTargetIdsQuery> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    async execute(query: IsUserConsumerExistsByRefIdAndTargetIdsQuery): Promise<boolean> {
        try {
            return await this.userConsumerRepository.isExistsByRefIdAndTargetIds(
                query.userId,
                query.consumerIds,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
