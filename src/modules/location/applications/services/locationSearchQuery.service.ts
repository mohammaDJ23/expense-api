import { Injectable } from '@nestjs/common';

import { LocationSearchService } from '@/modules/location/applications/services/search/locationSearch.service';
import { LocationSearchAggregateService } from '@/modules/location/applications/services/search/locationSearchAggregate.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IInput {
    userId: string;
    limit: number;
    q: string;
}

@Injectable()
export class LocationSearchQueryService implements IService<IInput, ISelectLocation[]> {
    constructor(
        private readonly locationSearchService: LocationSearchService,
        private readonly locationSearchAggregateService: LocationSearchAggregateService,
    ) {}

    async execute(input: IInput): Promise<ISelectLocation[]> {
        const locationIds = await this.locationSearchService.search(
            input.userId,
            input.q,
            input.limit,
        );

        return this.locationSearchAggregateService.aggregate(input.userId, locationIds);
    }
}
