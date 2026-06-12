import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { GetReceiverByNameOrNullQuery } from './getReceiverByNameOrNull.query';

import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(GetReceiverByNameOrNullQuery)
export class GetReceiverByNameOrNullHandler implements IQueryHandler<GetReceiverByNameOrNullQuery> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    execute(query: GetReceiverByNameOrNullQuery): Promise<TSelectReceiver | null> {
        return this.receiverRepository.getByNameOrNull(query.name);
    }
}
