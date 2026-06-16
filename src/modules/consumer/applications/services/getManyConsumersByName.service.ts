import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyConsumersByNameQuery } from '@/modules/consumer/applications/queries/getManyConsumersByName/getManyConsumersByName.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class GetManyConsumersByNameService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(names: string[]): Promise<TSelectConsumer[]> {
        try {
            const getManyConsumersByNameQuery = new GetManyConsumersByNameQuery(names);
            return await this.queryBus.execute<GetManyConsumersByNameQuery, TSelectConsumer[]>(
                getManyConsumersByNameQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
