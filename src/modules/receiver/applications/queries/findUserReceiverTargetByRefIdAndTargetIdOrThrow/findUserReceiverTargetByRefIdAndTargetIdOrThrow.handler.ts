import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { FindUserReceiverTargetByRefIdAndTargetIdOrThrowQuery } from './findUserReceiverTargetByRefIdAndTargetIdOrThrow.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindUserReceiverTargetByRefIdAndTargetIdOrThrowQuery)
export class FindUserReceiverTargetByRefIdAndTargetIdOrThrowHandler implements IQueryHandler<
    FindUserReceiverTargetByRefIdAndTargetIdOrThrowQuery,
    ISelectReceiver
> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    async execute(
        query: FindUserReceiverTargetByRefIdAndTargetIdOrThrowQuery,
    ): Promise<ISelectReceiver> {
        try {
            return await this.userReceiverRepository.findTargetByRefIdAndTargetIdOrThrow(
                query.userId,
                query.receiverId,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
