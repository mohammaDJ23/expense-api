import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetJoinedUserReceiverByIdOrThrowQuery } from '@/modules/receiver/applications/queries/getJoinedUserReceiverByIdOrThrow/getJoinedUserReceiverByIdOrThrow.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class GetJoinedUserReceiverByIdOrThrowService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, receiverId: string): Promise<TSelectReceiver> {
        try {
            const getJoinedUserReceiverByIdOrThrowQuery = new GetJoinedUserReceiverByIdOrThrowQuery(
                userId,
                receiverId,
            );
            return await this.queryBus.execute<
                GetJoinedUserReceiverByIdOrThrowQuery,
                TSelectReceiver
            >(getJoinedUserReceiverByIdOrThrowQuery);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
