import { Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
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
}
