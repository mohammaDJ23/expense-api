import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { ExistsConsumerByUserIdAndIdQuery } from './existsConsumerByUserIdAndId.query';

@QueryHandler(ExistsConsumerByUserIdAndIdQuery)
export class ExistsConsumerByUserIdAndIdHandler implements IQueryHandler<
    ExistsConsumerByUserIdAndIdQuery,
    boolean
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: ExistsConsumerByUserIdAndIdQuery): Promise<boolean> {
        try {
            return await this.consumerRepository.existsByUserIdAndId(
                query.props.userId,
                query.props.id,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
