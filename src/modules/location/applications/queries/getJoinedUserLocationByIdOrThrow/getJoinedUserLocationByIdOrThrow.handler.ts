import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { GetJoinedUserLocationByIdOrThrowQuery } from './getJoinedUserLocationByIdOrThrow.query';

import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(GetJoinedUserLocationByIdOrThrowQuery)
export class GetJoinedUserLocationByIdOrThrowHandler implements IQueryHandler<GetJoinedUserLocationByIdOrThrowQuery> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    execute(query: GetJoinedUserLocationByIdOrThrowQuery): Promise<TSelectLocation> {
        return this.userLocationRepository.getJoinedByIdOrThrow(query.userId, query.locationId);
    }
}
