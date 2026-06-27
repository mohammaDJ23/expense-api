import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { FindReceiverListByUserIdQuery } from './findReceiverListByUserId.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindReceiverListByUserIdQuery)
export class FindReceiverListByUserIdHandler implements IQueryHandler<
    FindReceiverListByUserIdQuery,
    ISelectReceiver[]
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: FindReceiverListByUserIdQuery): Promise<ISelectReceiver[]> {
        try {
            return await this.receiverRepository.findListByUserId(query.userId, {
                offset: query.offset,
                limit: query.limit,
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
