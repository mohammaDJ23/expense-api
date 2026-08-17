import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindMostUsedLocationsQuery } from '@/modules/bill/applications/queries/findMostUsedLocations/findMostUsedLocations.query';

import { LocationsRelationLoaderService } from './locationsRelationLoader.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IMostUsed } from '@/modules/bill/domain/types/mostUsed.type';
import type { IMostUsedLocation } from '@/modules/bill/domain/types/mostUsedLocation.type';

interface IProps {
    userId: string;
    limit: number;
}

@Injectable()
export class MostUsedLocationsService implements IService<IProps, IMostUsedLocation[]> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly locationsRelationLoaderService: LocationsRelationLoaderService,
    ) {}

    async execute(input: IProps): Promise<IMostUsedLocation[]> {
        const mostUsed = await this.queryDispatcher.execute<
            FindMostUsedLocationsQuery,
            IMostUsed[]
        >(
            new FindMostUsedLocationsQuery({
                userId: input.userId,
                limit: input.limit,
            }),
        );
        const locationIds = mostUsed.map((item) => item.id);
        const locations = await this.locationsRelationLoaderService.load({
            userId: input.userId,
            locationIds,
        });
        const mostUsedMap = new Map(mostUsed.map((item) => [item.id, item.total]));
        return locations.reduce<IMostUsedLocation[]>((acc, val) => {
            acc.push({
                ...val,
                total: mostUsedMap.get(val.id)!,
            });
            return acc;
        }, []);
    }
}
