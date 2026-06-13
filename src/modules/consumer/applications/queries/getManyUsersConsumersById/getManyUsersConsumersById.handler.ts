import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { GetManyUsersConsumersByIdQuery } from './getManyUsersConsumersById.query';

import type { TSelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@QueryHandler(GetManyUsersConsumersByIdQuery)
export class GetManyUsersConsumersByIdHandler implements IQueryHandler<GetManyUsersConsumersByIdQuery> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    execute(query: GetManyUsersConsumersByIdQuery): Promise<TSelectUserConsumer[]> {
        return this.userConsumerRepository.getManyById(query.userId, query.consumerIds);
    }
}
