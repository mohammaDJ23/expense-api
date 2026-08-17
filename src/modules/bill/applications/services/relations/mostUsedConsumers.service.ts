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
        const consumerIds = mostUsed.map((item) => item.id);
        const consumers = await this.consumersRelationLoaderService.load({
            userId: input.userId,
            consumerIds,
        });
        const mostUsedMap = new Map(mostUsed.map((item) => [item.id, item.total]));
        return consumers.reduce<IMostUsedConsumer[]>((acc, val) => {
            acc.push({
                ...val,
                total: mostUsedMap.get(val.id)!,
            });
            return acc;
        }, []);
    }
}
