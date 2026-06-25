import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { IsUserConsumerExistsByRefIdAndTargetIdQuery } from './isUserConsumerExistsByRefIdAndTargetId.query';

@QueryHandler(IsUserConsumerExistsByRefIdAndTargetIdQuery)
export class IsUserConsumerExistsByRefIdAndTargetIdHandler implements IQueryHandler<IsUserConsumerExistsByRefIdAndTargetIdQuery> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    async execute(query: IsUserConsumerExistsByRefIdAndTargetIdQuery): Promise<boolean> {
        try {
            return await this.userConsumerRepository.isExistsByRefIdAndTargetId(
                query.userId,
                query.consumerId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
