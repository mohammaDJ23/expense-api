import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { FindReceiverByUserIdAndNameOrNullQuery } from './findReceiverByUserIdAndNameOrNull.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindReceiverByUserIdAndNameOrNullQuery)
export class FindReceiverByUserIdAndNameOrNullHandler implements IQueryHandler<
    FindReceiverByUserIdAndNameOrNullQuery,
    ISelectReceiver | null
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: FindReceiverByUserIdAndNameOrNullQuery): Promise<ISelectReceiver | null> {
        try {
            return await this.receiverRepository.findByUserIdAndNameOrNull(
                query.userId,
                query.name,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
