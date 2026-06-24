import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { IsConsumerExistsByIdsQuery } from '@/modules/consumer/applications/queries/isConsumerExistsByIds/isConsumerExistsByIds.query';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

@QueryHandler(IsConsumerExistsByIdsQuery)
export class IsConsumerExistsByIdsHandler implements IQueryHandler<IsConsumerExistsByIdsQuery> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: IsConsumerExistsByIdsQuery): Promise<boolean> {
        try {
            return await this.consumerRepository.isExistsByIds(query.ids);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
