import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { FindManyReceiversByUserIdAndIdsQuery } from './findManyReceiversByUserIdAndIds.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindManyReceiversByUserIdAndIdsQuery)
export class FindManyReceiversByUserIdAndIdsHandler implements IQueryHandler<
    FindManyReceiversByUserIdAndIdsQuery,
    ISelectReceiver[]
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: FindManyReceiversByUserIdAndIdsQuery): Promise<ISelectReceiver[]> {
        try {
            return await this.receiverRepository.findManyByUserIdAndIds(
                query.props.userId,
                query.props.ids,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
