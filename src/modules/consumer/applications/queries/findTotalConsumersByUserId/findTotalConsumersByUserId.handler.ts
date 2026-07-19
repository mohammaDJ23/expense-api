import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { FindTotalConsumersByUserIdQuery } from './findTotalConsumersByUserId.query';

@QueryHandler(FindTotalConsumersByUserIdQuery)
export class FindTotalConsumersByUserIdHandler implements IQueryHandler<
    FindTotalConsumersByUserIdQuery,
    number
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(query: FindTotalConsumersByUserIdQuery): Promise<number> {
        try {
            return await this.consumerRepository.findTotalByUserId(query.props.userId);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
