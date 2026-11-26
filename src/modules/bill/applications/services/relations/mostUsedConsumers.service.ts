import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindMostUsedConsumersQuery } from '@/modules/bill/applications/queries/findMostUsedConsumers/findMostUsedConsumers.query';

import { ConsumersRelationLoaderService } from './consumersRelationLoader.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IMostUsed } from '@/modules/bill/domain/types/mostUsed.type';
import type { IMostUsedConsumer } from '@/modules/bill/domain/types/mostUsedConsumer.type';

interface IProps {
    userId: string;
    limit: number;
}

@Injectable()
export class MostUsedConsumersService implements IService<IProps, IMostUsedConsumer[]> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly consumersRelationLoaderService: ConsumersRelationLoaderService,
    ) {}

    async execute(input: IProps): Promise<IMostUsedConsumer[]> {
        const mostUsed = await this.queryDispatcher.execute<
            FindMostUsedConsumersQuery,
            IMostUsed[]
        >(
            new FindMostUsedConsumersQuery({
                userId: input.userId,
                limit: input.limit,
            }),
        );
        const consumers = await this.consumersRelationLoaderService.load({
            userId: input.userId,
            consumerIds: mostUsed.map(({ id }) => id),
        });
        const consumersMap = new Map(consumers.map((consumer) => [consumer.id, consumer]));
        return mostUsed.flatMap(({ id, total }) => {
            const consumer = consumersMap.get(id);
            return consumer ? [{ ...consumer, total }] : [];
        });
    }
}
