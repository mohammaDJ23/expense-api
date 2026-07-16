import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { FindManyLocationsByUserIdAndIdsQuery } from '@/modules/location/applications/queries/findManyLocationsByUserIdAndIds/findManyLocationsByUserIdAndIds.query';

import type { IRelationLoaderService } from '@/core/interfaces/relationLoaderService.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IInput {
    userId: string;
    bills: ISelectBill[];
}

type TOutput = ISelectLocation[];

@Injectable()
export class LocationsRelationLoaderService implements IRelationLoaderService<IInput, TOutput> {
    constructor(private readonly queryBus: QueryBus) {}

    load(input: IInput): Promise<TOutput> {
        return whenNotEmpty(input.bills, (bills) =>
            this.queryBus.execute<FindManyLocationsByUserIdAndIdsQuery, ISelectLocation[]>(
                new FindManyLocationsByUserIdAndIdsQuery({
                    userId: input.userId,
                    ids: bills.map((bill) => bill.locationId),
                }),
            ),
        );
    }
}
