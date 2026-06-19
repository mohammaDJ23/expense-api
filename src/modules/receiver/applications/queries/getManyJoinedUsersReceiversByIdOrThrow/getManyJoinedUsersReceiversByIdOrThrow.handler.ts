import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { GetManyJoinedUsersReceiversByIdOrThrowQuery } from './getManyJoinedUsersReceiversByIdOrThrow.query';

import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(GetManyJoinedUsersReceiversByIdOrThrowQuery)
export class GetManyJoinedUsersReceiversByIdOrThrowHandler implements IQueryHandler<GetManyJoinedUsersReceiversByIdOrThrowQuery> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    execute(query: GetManyJoinedUsersReceiversByIdOrThrowQuery): Promise<TSelectReceiver[]> {
        return this.userReceiverRepository.getManyJoinedByIdOrThrow(
            query.userId,
            query.receiverIds,
        );
    }
}
