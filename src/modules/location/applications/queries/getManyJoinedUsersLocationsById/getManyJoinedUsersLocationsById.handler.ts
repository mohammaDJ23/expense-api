import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { GetManyJoinedUsersLocationsByIdQuery } from './getManyJoinedUsersLocationsById.query';

import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(GetManyJoinedUsersLocationsByIdQuery)
export class GetManyJoinedUsersLocationsByIdHandler implements IQueryHandler<GetManyJoinedUsersLocationsByIdQuery> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    execute(query: GetManyJoinedUsersLocationsByIdQuery): Promise<TSelectLocation[]> {
        return this.userLocationRepository.getManyJoinedById(query.userId, query.locationIds);
    }
}
