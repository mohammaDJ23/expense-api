import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { FindReceiverByIdOrThrowQuery } from './findReceiverByIdOrThrow.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@QueryHandler(FindReceiverByIdOrThrowQuery)
export class FindReceiverByIdOrThrowHandler implements IQueryHandler<FindReceiverByIdOrThrowQuery> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: FindReceiverByIdOrThrowQuery): Promise<ISelectReceiver> {
        try {
            return await this.receiverRepository.findByIdOrThrow(query.id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
