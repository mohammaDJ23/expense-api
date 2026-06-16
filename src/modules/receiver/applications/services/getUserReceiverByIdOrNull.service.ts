import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetUserReceiverByIdOrNullQuery } from '@/modules/receiver/applications/queries/getUserReceiverByIdOrNull/getUserReceiverByIdOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUserReceiver } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

@Injectable()
export class GetUserReceiverByIdOrNullService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, receiverId: string): Promise<TSelectUserReceiver | null> {
        try {
            const getUserReceiverByIdOrNullQuery = new GetUserReceiverByIdOrNullQuery(
                userId,
                receiverId,
            );
            return await this.queryBus.execute<
                GetUserReceiverByIdOrNullQuery,
                TSelectUserReceiver | null
            >(getUserReceiverByIdOrNullQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
