import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { FindUserReceiverByIdOrNullQuery } from './findUserReceiverByIdOrNull.query';

import type { ISelectUserReceiver } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

@QueryHandler(FindUserReceiverByIdOrNullQuery)
export class FindUserReceiverByIdOrNullHandler implements IQueryHandler<FindUserReceiverByIdOrNullQuery> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    async execute(query: FindUserReceiverByIdOrNullQuery): Promise<ISelectUserReceiver | null> {
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
