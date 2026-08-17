import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindMostUsedReceiversQuery } from '@/modules/bill/applications/queries/findMostUsedReceivers/findMostUsedReceivers.query';

import { ReceiversRelationLoaderService } from './receiversRelationLoader.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IMostUsed } from '@/modules/bill/domain/types/mostUsed.type';
import type { IMostUsedReceiver } from '@/modules/bill/domain/types/mostUsedReceiver.type';

interface IProps {
    userId: string;
    limit: number;
}

@Injectable()
export class MostUsedReceiversService implements IService<IProps, IMostUsedReceiver[]> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly receiversRelationLoaderService: ReceiversRelationLoaderService,
    ) {}

    async execute(input: IProps): Promise<IMostUsedReceiver[]> {
        const mostUsed = await this.queryDispatcher.execute<
            FindMostUsedReceiversQuery,
            IMostUsed[]
        >(
            new FindMostUsedReceiversQuery({
                userId: input.userId,
                limit: input.limit,
            }),
        );
        const receiverIds = mostUsed.map((item) => item.id);
        const receivers = await this.receiversRelationLoaderService.load({
            userId: input.userId,
            receiverIds,
        });
        const mostUsedMap = new Map(mostUsed.map((item) => [item.id, item.total]));
        return receivers.reduce<IMostUsedReceiver[]>((acc, val) => {
            acc.push({
                ...val,
                total: mostUsedMap.get(val.id)!,
            });
            return acc;
        }, []);
    }
}
