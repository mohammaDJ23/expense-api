import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetLocationByNameOrNullQuery } from './getLocationByNameOrNull.query';

import type { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(GetLocationByNameOrNullQuery)
export class GetLocationByNameOrNullHandler implements IQueryHandler<GetLocationByNameOrNullQuery> {
    constructor(private readonly locationRepository: LocationRepository) {}

    execute(query: GetLocationByNameOrNullQuery): Promise<TSelectLocation | null> {
        return this.locationRepository.getByNameOrNull(query.name);
    }
}
