import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { FindUserReceiverTargetsByRefIdQuery } from './findUserReceiverTargetsByRefId.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindUserReceiverTargetsByRefIdQuery)
export class FindUserReceiverTargetsByRefIdHandler implements IQueryHandler<
    FindUserReceiverTargetsByRefIdQuery,
    ISelectReceiver[]
> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    async execute(query: FindUserReceiverTargetsByRefIdQuery): Promise<ISelectReceiver[]> {
        try {
            return await this.userReceiverRepository.findTargetsByRefId(query.userId, {
                offset: query.offset,
                limit: query.limit,
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
