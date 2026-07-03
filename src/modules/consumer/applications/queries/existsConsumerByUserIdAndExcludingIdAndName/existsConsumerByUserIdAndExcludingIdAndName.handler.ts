import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { ExistsConsumerByUserIdAndExcludingIdAndNameQuery } from './existsConsumerByUserIdAndExcludingIdAndName.query';

@QueryHandler(ExistsConsumerByUserIdAndExcludingIdAndNameQuery)
export class ExistsConsumerByUserIdAndExcludingIdAndNameHandler implements IQueryHandler<
    ExistsConsumerByUserIdAndExcludingIdAndNameQuery,
    boolean
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: ExistsConsumerByUserIdAndExcludingIdAndNameQuery): Promise<boolean> {
        try {
            return await this.consumerRepository.existsByUserIdAndExcludingIdAndName(
                query.props.userId,
                query.props.excludingId,
                query.props.name,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
