import { Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import {
    locations,
    type ISelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';
import {
    usersLocations,
    type IInsertUserLocation,
    type ISelectUserLocation,
} from '@/modules/location/infrastructure/schemas/userLocation.schema';

import type { IList } from '@/core/interfaces/list.interface';
import type { IUserLocationRepository } from '@/modules/location/domain/interfaces/userLocationRepository.interface';

@Injectable()
export class UserLocationRepository implements IUserLocationRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertUserLocation): Promise<ISelectUserLocation> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(usersLocations).values(data).returning().execute(),
            'Unable to create',
        );
    }

    findByRefIdAndTargetIdOrNull(
        refId: string,
        targetId: string,
    ): Promise<ISelectUserLocation | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(usersLocations)
                .where(
                    and(eq(usersLocations.userId, refId), eq(usersLocations.locationId, targetId)),
                )
                .execute(),
        );
    }

    findTargetByRefIdAndTargetIdOrThrow(refId: string, targetId: string): Promise<ISelectLocation> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select({
                    id: locations.id,
                    name: locations.name,
                    createdAt: locations.createdAt,
                    updatedAt: locations.updatedAt,
                })
                .from(usersLocations)
                .innerJoin(locations, eq(usersLocations.locationId, locations.id))
                .where(
                    and(eq(usersLocations.userId, refId), eq(usersLocations.locationId, targetId)),
                )
                .execute(),
            'Unable to find',
        );
    }

    findTargetsByRefId(refId: string, options: IList): Promise<ISelectLocation[]> {
        return toEntities(
            this.drizzleRepository.db
                .select({
                    id: locations.id,
                    name: locations.name,
                    createdAt: locations.createdAt,
                    updatedAt: locations.updatedAt,
                })
                .from(usersLocations)
                .innerJoin(locations, eq(usersLocations.locationId, locations.id))
                .where(and(eq(usersLocations.userId, refId)))
                .orderBy(desc(usersLocations.createdAt))
                .offset(options.offset)
                .limit(options.limit)
                .execute(),
        );
    }
}
