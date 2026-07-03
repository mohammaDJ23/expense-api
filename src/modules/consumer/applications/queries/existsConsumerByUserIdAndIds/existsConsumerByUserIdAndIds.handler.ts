import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { ExistsConsumerByUserIdAndIdsQuery } from './existsConsumerByUserIdAndIds.query';

@QueryHandler(ExistsConsumerByUserIdAndIdsQuery)
export class ExistsConsumerByUserIdAndIdsHandler implements IQueryHandler<
    ExistsConsumerByUserIdAndIdsQuery,
    boolean
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: ExistsConsumerByUserIdAndIdsQuery): Promise<boolean> {
        try {
            return await this.consumerRepository.existsByUserIdAndIds(
                query.props.userId,
                query.props.ids,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
