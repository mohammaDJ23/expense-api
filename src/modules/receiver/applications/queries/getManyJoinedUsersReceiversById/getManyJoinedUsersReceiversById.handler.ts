import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { GetManyJoinedUsersReceiversByIdQuery } from './getManyJoinedUsersReceiversById.query';

import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(GetManyJoinedUsersReceiversByIdQuery)
export class GetManyJoinedUsersReceiversByIdHandler implements IQueryHandler<GetManyJoinedUsersReceiversByIdQuery> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    execute(query: GetManyJoinedUsersReceiversByIdQuery): Promise<TSelectReceiver[]> {
        return this.userReceiverRepository.getManyJoinedById(query.userId, query.receiverIds);
    }
}
