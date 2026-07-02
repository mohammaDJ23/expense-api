import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { IsConsumerExistsByUserIdAndIdQuery } from './isConsumerExistsByUserIdAndId.query';

@QueryHandler(IsConsumerExistsByUserIdAndIdQuery)
export class IsConsumerExistsByUserIdAndIdHandler implements IQueryHandler<
    IsConsumerExistsByUserIdAndIdQuery,
    boolean
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: IsConsumerExistsByUserIdAndIdQuery): Promise<boolean> {
        try {
            return await this.consumerRepository.isExistsByUserIdAndId(
                query.props.userId,
                query.props.id,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
