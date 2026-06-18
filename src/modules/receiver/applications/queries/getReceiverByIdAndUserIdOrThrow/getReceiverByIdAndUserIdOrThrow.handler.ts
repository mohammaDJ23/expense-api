import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { GetReceiverByIdAndUserIdOrThrowQuery } from './getReceiverByIdAndUserIdOrThrow.query';

import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(GetReceiverByIdAndUserIdOrThrowQuery)
export class GetReceiverByIdAndUserIdOrThrowHandler implements IQueryHandler<GetReceiverByIdAndUserIdOrThrowQuery> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    execute(query: GetReceiverByIdAndUserIdOrThrowQuery): Promise<TSelectReceiver> {
        return this.receiverRepository.getByIdAndUserIdOrThrow(query.userId, query.receiverId);
    }
}
