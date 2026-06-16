import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetReceiverByNameOrNullQuery } from '@/modules/receiver/applications/queries/getReceiverByNameOrNull/getReceiverByNameOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class GetReceiverByNameOrNullService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(name: string): Promise<TSelectReceiver | null> {
        try {
            const getReceiverByNameOrNullQuery = new GetReceiverByNameOrNullQuery(name);
            return await this.queryBus.execute<
                GetReceiverByNameOrNullQuery,
                TSelectReceiver | null
            >(getReceiverByNameOrNullQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
