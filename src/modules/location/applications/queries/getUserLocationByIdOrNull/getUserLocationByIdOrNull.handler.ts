import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { GetUserLocationByIdOrNullQuery } from './getUserLocationByIdOrNull.query';

import type { TSelectUserLocation } from '@/modules/location/infrastructure/schemas/userLocation.schema';

@QueryHandler(GetUserLocationByIdOrNullQuery)
export class GetUserLocationByIdOrNullHandler implements IQueryHandler<GetUserLocationByIdOrNullQuery> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    execute(query: GetUserLocationByIdOrNullQuery): Promise<TSelectUserLocation | null> {
        return this.userLocationRepository.getByIdOrNull(query.userId, query.locationId);
    }
}
