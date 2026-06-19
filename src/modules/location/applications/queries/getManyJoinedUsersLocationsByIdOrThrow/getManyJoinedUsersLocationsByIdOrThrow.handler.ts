import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { GetManyJoinedUsersLocationsByIdOrThrowQuery } from './getManyJoinedUsersLocationsByIdOrThrow.query';

import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(GetManyJoinedUsersLocationsByIdOrThrowQuery)
export class GetManyJoinedUsersLocationsByIdOrThrowHandler implements IQueryHandler<GetManyJoinedUsersLocationsByIdOrThrowQuery> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    execute(query: GetManyJoinedUsersLocationsByIdOrThrowQuery): Promise<TSelectLocation[]> {
        return this.userLocationRepository.getManyJoinedByIdOrThrow(
            query.userId,
            query.locationIds,
        );
    }
}
