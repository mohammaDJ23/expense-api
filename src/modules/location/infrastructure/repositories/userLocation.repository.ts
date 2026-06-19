import { Injectable } from '@nestjs/common';
import { and, eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntitiesOrThrow,
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    locations,
    type TSelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';
import {
    usersLocations,
    type TInsertUserLocation,
    type TSelectUserLocation,
} from '@/modules/location/infrastructure/schemas/userLocation.schema';

import type { IUserLocationRepository } from '@/modules/location/domain/interfaces/userLocationRepository.interface';

@Injectable()
export class UserLocationRepository extends DrizzleRepository implements IUserLocationRepository {
    create(data: TInsertUserLocation): Promise<TSelectUserLocation> {
        return toEntityOrThrow(
            this.db.insert(usersLocations).values(data).returning().execute(),
            'Unable to create',
        );
    }

    getByIdOrNull(userId: string, locationId: string): Promise<TSelectUserLocation | null> {
        return toEntityOrNull(
            this.db
                .select()
                .from(usersLocations)
                .where(
                    and(
                        eq(usersLocations.userId, userId),
                        eq(usersLocations.locationId, locationId),
                    ),
                )
                .execute(),
        );
    }

    getManyJoinedByIdOrThrow(userId: string, locationIds: string[]): Promise<TSelectLocation[]> {
        return toEntitiesOrThrow(
            this.db
                .select({
                    id: locations.id,
                    name: locations.name,
                    createdAt: locations.createdAt,
                    updatedAt: locations.updatedAt,
                })
                .from(usersLocations)
                .innerJoin(locations, eq(usersLocations.locationId, locations.id))
                .where(
                    and(
                        eq(usersLocations.userId, userId),
                        inArray(usersLocations.locationId, locationIds),
                    ),
                )
                .execute(),
            'Unable to load the location',
        );
    }
}
