import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { FindReceiverByUserIdAndIdOrNullQuery } from './findReceiverByUserIdAndIdOrNull.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindReceiverByUserIdAndIdOrNullQuery)
export class FindReceiverByUserIdAndIdOrNullHandler implements IQueryHandler<
    FindReceiverByUserIdAndIdOrNullQuery,
    ISelectReceiver | null
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: FindReceiverByUserIdAndIdOrNullQuery): Promise<ISelectReceiver | null> {
        try {
            return await this.receiverRepository.findByUserIdAndIdOrNull(
                query.userId,
                query.receiverId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
