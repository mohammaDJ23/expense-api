import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { GetReceiverByIdOrThrowQuery } from './getReceiverByIdOrThrow.query';

import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(GetReceiverByIdOrThrowQuery)
export class GetReceiverByIdOrThrowHandler implements IQueryHandler<GetReceiverByIdOrThrowQuery> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    execute(query: GetReceiverByIdOrThrowQuery): Promise<TSelectReceiver> {
        return this.receiverRepository.getByIdOrThrow(query.id);
    }
}
