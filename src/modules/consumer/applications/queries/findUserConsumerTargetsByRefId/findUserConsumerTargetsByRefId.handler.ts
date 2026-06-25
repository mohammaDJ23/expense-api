import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { FindUserConsumerTargetsByRefIdQuery } from './findUserConsumerTargetsByRefId.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@QueryHandler(FindUserConsumerTargetsByRefIdQuery)
export class FindUserConsumerTargetsByRefIdHandler implements IQueryHandler<
    FindUserConsumerTargetsByRefIdQuery,
    ISelectConsumer[]
> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    async execute(query: FindUserConsumerTargetsByRefIdQuery): Promise<ISelectConsumer[]> {
        try {
            return await this.userConsumerRepository.findTargetsByRefId(query.userId, {
                offset: query.offset,
                limit: query.limit,
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
