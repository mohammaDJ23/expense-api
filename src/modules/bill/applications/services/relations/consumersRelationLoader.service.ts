import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { whenNotEmpty } from '@/core/utils/whenNotEmpty.util';
import { FindManyConsumersByUserIdAndIdsQuery } from '@/modules/consumer/applications/queries/findManyConsumersByUserIdAndIds/findManyConsumersByUserIdAndIds.query';

import type { IRelationLoaderService } from '@/core/interfaces/relations/relationLoaderService.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

interface IInput {
    userId: string;
    consumerIds: string[];
}

@Injectable()
export class ConsumersRelationLoaderService implements IRelationLoaderService<
    IInput,
    ISelectConsumer[]
> {
    constructor(private readonly queryDispatcher: QueryDispatcher) {}

    load(input: IInput): Promise<ISelectConsumer[]> {
        return whenNotEmpty(input.consumerIds, (consumerIds) =>
            this.queryDispatcher.execute<FindManyConsumersByUserIdAndIdsQuery, ISelectConsumer[]>(
                new FindManyConsumersByUserIdAndIdsQuery({
                    userId: input.userId,
                    ids: consumerIds,
                }),
            ),
        );
    }
}
