import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindLocationByUserIdAndIdOrThrowQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrThrow/findLocationByUserIdAndIdOrThrow.query';

import type { IRelationLoaderService } from '@/core/interfaces/relationLoaderService.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IInput {
    userId: string;
    bill: ISelectBill;
}

type TOutput = ISelectLocation;

@Injectable()
export class LocationRelationLoaderService implements IRelationLoaderService<IInput, TOutput> {
    constructor(private readonly queryBus: QueryBus) {}

    load(input: IInput): Promise<TOutput> {
        return this.queryBus.execute<FindLocationByUserIdAndIdOrThrowQuery, ISelectLocation>(
            new FindLocationByUserIdAndIdOrThrowQuery({
                userId: input.userId,
                id: input.bill.locationId,
            }),
        );
    }
}
