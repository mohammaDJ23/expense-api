import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { FindUserReceiverByRefIdAndTargetIdOrNullQuery } from './findUserReceiverByRefIdAndTargetIdOrNull.query';

import type { ISelectUserReceiver } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

@QueryHandler(FindUserReceiverByRefIdAndTargetIdOrNullQuery)
export class FindUserReceiverByRefIdAndTargetIdOrNullHandler implements IQueryHandler<FindUserReceiverByRefIdAndTargetIdOrNullQuery> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    async execute(
        query: FindUserReceiverByRefIdAndTargetIdOrNullQuery,
    ): Promise<ISelectUserReceiver | null> {
        try {
            return await this.userReceiverRepository.findByRefIdAndTargetIdOrNull(
                query.userId,
                query.receiverId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
