import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { GetManyUserConsumerByIdQuery } from './getManyUserConsumerById.query';

import type { TSelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@QueryHandler(GetManyUserConsumerByIdQuery)
export class GetManyUserConsumerByIdHandler implements IQueryHandler<GetManyUserConsumerByIdQuery> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    execute(query: GetManyUserConsumerByIdQuery): Promise<TSelectUserConsumer[]> {
        return this.userConsumerRepository.getManyById(query.userId, query.consumerIds);
    }
}
