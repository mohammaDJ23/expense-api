import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { FindReceiverByNameOrNullQuery } from './findReceiverByNameOrNull.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindReceiverByNameOrNullQuery)
export class FindReceiverByNameOrNullHandler implements IQueryHandler<FindReceiverByNameOrNullQuery> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: FindReceiverByNameOrNullQuery): Promise<ISelectReceiver | null> {
        try {
            return await this.receiverRepository.findByNameOrNull(query.name);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
