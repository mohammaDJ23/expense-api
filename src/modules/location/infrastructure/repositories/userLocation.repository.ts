import { Injectable } from '@nestjs/common';
import { and, eq, inArray, sql } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntities,
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
            this.db
                .insert(usersLocations)
                .values(data)
                .returning()
                .prepare('create_user_location')
                .execute(),
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
                        eq(usersLocations.userId, sql.placeholder('userId')),
                        eq(usersLocations.locationId, sql.placeholder('locationId')),
                    ),
                )
                .prepare('get_user_location_by_id')
                .execute({ userId, locationId }),
        );
    }

    getJoinedByIdOrThrow(userId: string, locationId: string): Promise<TSelectLocation> {
        return toEntityOrThrow(
            this.db
                .select({
                    id: locations.id,
                    name: locations.id,
                    createdAt: locations.createdAt,
                    updatedAt: locations.updatedAt,
                })
                .from(usersLocations)
                .innerJoin(locations, eq(usersLocations.locationId, locations.id))
                .where(
                    and(
                        eq(usersLocations.userId, sql.placeholder('userId')),
                        eq(usersLocations.locationId, sql.placeholder('locationId')),
                    ),
                )
                .prepare('get_joined_user_location_by_id')
                .execute({ userId, locationId }),
            'Unable to find',
        );
    }

    getManyJoinedById(userId: string, locationIds: string[]): Promise<TSelectLocation[]> {
        return toEntities(
            this.db
                .select({
                    id: locations.id,
                    name: locations.id,
                    createdAt: locations.createdAt,
                    updatedAt: locations.updatedAt,
                })
                .from(usersLocations)
                .innerJoin(locations, eq(usersLocations.locationId, locations.id))
                .where(
                    and(
                        eq(usersLocations.userId, sql.placeholder('userId')),
                        inArray(usersLocations.locationId, locationIds),
                    ),
                )
                .prepare('get_joined_user_location_by_id')
                .execute({ userId }),
        );
    }
}
