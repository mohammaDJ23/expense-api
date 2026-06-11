import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { GetUserConsumerByIdOrNullQuery } from './getUserConsumerByIdOrNull.query';

import type { TSelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@QueryHandler(GetUserConsumerByIdOrNullQuery)
export class GetUserConsumerByIdOrNullHandler implements IQueryHandler<GetUserConsumerByIdOrNullQuery> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    execute(query: GetUserConsumerByIdOrNullQuery): Promise<TSelectUserConsumer | null> {
        return this.userConsumerRepository.getByIdOrNull(query.userId, query.consumerId);
    }
}
