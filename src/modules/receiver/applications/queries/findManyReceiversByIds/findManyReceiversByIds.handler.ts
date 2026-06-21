import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { FindManyReceiversByIdsQuery } from './findManyReceiversByIds.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindManyReceiversByIdsQuery)
export class FindManyReceiversByIdsHandler implements IQueryHandler<FindManyReceiversByIdsQuery> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: FindManyReceiversByIdsQuery): Promise<ISelectReceiver[]> {
        try {
            return await this.receiverRepository.findManyByIds(query.ids);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
