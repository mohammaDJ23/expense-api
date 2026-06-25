import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { FindUserConsumerTargetListByRefIdQuery } from './findUserConsumerTargetListByRefId.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(FindUserConsumerTargetListByRefIdQuery)
export class FindUserConsumerTargetListByRefIdHandler implements IQueryHandler<
    FindUserConsumerTargetListByRefIdQuery,
    ISelectConsumer[]
> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    async execute(query: FindUserConsumerTargetListByRefIdQuery): Promise<ISelectConsumer[]> {
        try {
            return await this.userConsumerRepository.findTargetListByRefId(query.userId, {
                offset: query.offset,
                limit: query.limit,
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
