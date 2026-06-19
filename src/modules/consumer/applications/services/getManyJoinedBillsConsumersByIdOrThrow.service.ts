import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyJoinedBillsConsumersByIdOrThrowQuery } from '@/modules/consumer/applications/queries/getManyJoinedBillsConsumersByIdOrThrow/getManyJoinedBillsConsumersByIdOrThrow.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IJoinedBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

@Injectable()
export class GetManyJoinedBillsConsumersByIdOrThrowService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(billIds: string[]): Promise<IJoinedBillConsumer[]> {
        try {
            const getManyJoinedBillsConsumersByIdOrThrowQuery =
                new GetManyJoinedBillsConsumersByIdOrThrowQuery(billIds);
            return await this.queryBus.execute<
                GetManyJoinedBillsConsumersByIdOrThrowQuery,
                IJoinedBillConsumer[]
            >(getManyJoinedBillsConsumersByIdOrThrowQuery);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
