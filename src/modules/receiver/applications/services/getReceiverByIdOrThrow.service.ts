import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetReceiverByIdOrThrowQuery } from '@/modules/receiver/applications/queries/getReceiverByIdOrThrow/getReceiverByIdOrThrow.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class GetReceiverByIdOrThrowService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(id: string): Promise<TSelectReceiver> {
        try {
            const getReceiverByIdOrThrowQuery = new GetReceiverByIdOrThrowQuery(id);
            return await this.queryBus.execute<GetReceiverByIdOrThrowQuery, TSelectReceiver>(
                getReceiverByIdOrThrowQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
