import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { GetJoinedUserReceiverByIdOrThrowQuery } from './getJoinedUserReceiverByIdOrThrow.query';

import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(GetJoinedUserReceiverByIdOrThrowQuery)
export class GetJoinedUserReceiverByIdOrThrowHandler implements IQueryHandler<GetJoinedUserReceiverByIdOrThrowQuery> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    execute(query: GetJoinedUserReceiverByIdOrThrowQuery): Promise<TSelectReceiver> {
        return this.userReceiverRepository.getJoinedByIdOThrow(query.userId, query.receiverId);
    }
}
