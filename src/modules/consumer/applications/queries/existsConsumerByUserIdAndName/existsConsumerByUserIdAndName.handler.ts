import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { ExistsConsumerByUserIdAndNameQuery } from './existsConsumerByUserIdAndName.query';

@QueryHandler(ExistsConsumerByUserIdAndNameQuery)
export class ExistsConsumerByUserIdAndNameHandler implements IQueryHandler<
    ExistsConsumerByUserIdAndNameQuery,
    boolean
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: ExistsConsumerByUserIdAndNameQuery): Promise<boolean> {
        try {
            return await this.consumerRepository.existsByUserIdAndName(
                query.props.userId,
                query.props.name,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
