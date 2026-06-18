import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetReceiverByIdAndUserIdOrThrowQuery } from '@/modules/receiver/applications/queries/getReceiverByIdAndUserIdOrThrow/getReceiverByIdAndUserIdOrThrow.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class GetReceiverByIdAndUserIdOrThrowService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, receiverId: string): Promise<TSelectReceiver> {
        try {
            const getReceiverByIdAndUserIdOrThrowQuery = new GetReceiverByIdAndUserIdOrThrowQuery(
                userId,
                receiverId,
            );
            return await this.queryBus.execute<
                GetReceiverByIdAndUserIdOrThrowQuery,
                TSelectReceiver
            >(getReceiverByIdAndUserIdOrThrowQuery);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
