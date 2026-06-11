import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { GetUserReceiverByIdOrNullQuery } from './getUserReceiverByIdOrNull.query';

import type { TSelectUserReceiver } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

@QueryHandler(GetUserReceiverByIdOrNullQuery)
export class GetUserReceiverByIdOrNullHandler implements IQueryHandler<GetUserReceiverByIdOrNullQuery> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    execute(query: GetUserReceiverByIdOrNullQuery): Promise<TSelectUserReceiver | null> {
        return this.userReceiverRepository.getByIdOrNull(query.userId, query.receiverId);
    }
}
