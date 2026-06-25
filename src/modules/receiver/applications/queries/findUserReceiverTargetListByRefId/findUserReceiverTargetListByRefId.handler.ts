import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { FindUserReceiverTargetListByRefIdQuery } from './findUserReceiverTargetListByRefId.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindUserReceiverTargetListByRefIdQuery)
export class FindUserReceiverTargetListByRefIdHandler implements IQueryHandler<
    FindUserReceiverTargetListByRefIdQuery,
    ISelectReceiver[]
> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    async execute(query: FindUserReceiverTargetListByRefIdQuery): Promise<ISelectReceiver[]> {
        try {
            return await this.userReceiverRepository.findTargetListByRefId(query.userId, {
                offset: query.offset,
                limit: query.limit,
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
