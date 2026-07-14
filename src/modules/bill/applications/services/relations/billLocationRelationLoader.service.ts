import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindLocationByUserIdAndIdOrThrowQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrThrow/findLocationByUserIdAndIdOrThrow.query';
import { FindManyLocationsByUserIdAndIdsQuery } from '@/modules/location/applications/queries/findManyLocationsByUserIdAndIds/findManyLocationsByUserIdAndIds.query';

import type { IManyRelationsLoaderByUserIdService } from '@/core/interfaces/relationLoaders/manyRelationsLoaderByUserIdService.interface';
import type { IOneRelationLoaderByUserIdService } from '@/core/interfaces/relationLoaders/oneRelationLoaderByUserIdService.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class BillLocationRelationLoaderService
    implements
        IOneRelationLoaderByUserIdService<ISelectBill, ISelectLocation>,
        IManyRelationsLoaderByUserIdService<ISelectBill, ISelectLocation>
{
    constructor(private readonly queryBus: QueryBus) {}

    loadOne(userId: string, source: ISelectBill): Promise<ISelectLocation> {
        return this.queryBus.execute<FindLocationByUserIdAndIdOrThrowQuery, ISelectLocation>(
            new FindLocationByUserIdAndIdOrThrowQuery({
                userId,
                id: source.locationId,
            }),
        );
    }

    loadMany(userId: string, sources: ISelectBill[]): Promise<ISelectLocation[]> {
        return whenNotEmpty(sources, (sources) =>
            this.queryBus.execute<FindManyLocationsByUserIdAndIdsQuery, ISelectLocation[]>(
                new FindManyLocationsByUserIdAndIdsQuery({
                    userId,
                    ids: sources.map((source) => source.locationId),
                }),
            ),
        );
    }
}
