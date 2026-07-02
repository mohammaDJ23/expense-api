import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { FindReceiverByUserIdAndIdOrThrowQuery } from './findReceiverByUserIdAndIdOrThrow.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindReceiverByUserIdAndIdOrThrowQuery)
export class FindReceiverByUserIdAndIdOrThrowHandler implements IQueryHandler<
    FindReceiverByUserIdAndIdOrThrowQuery,
    ISelectReceiver
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: FindReceiverByUserIdAndIdOrThrowQuery): Promise<ISelectReceiver> {
        try {
            return await this.receiverRepository.findByUserIdAndIdOrThrow(
                query.props.userId,
                query.props.id,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
