import { Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    locations,
    type TInsertLocation,
    type TSelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';

import type { ILocationRepository } from '@/modules/location/domain/interfaces/locationRepository.interface';

@Injectable()
export class LocationRepository extends DrizzleRepository implements ILocationRepository {
    create(data: TInsertLocation): Promise<TSelectLocation> {
        return toEntityOrThrow(
            this.db.insert(locations).values(data).returning().prepare('create_location').execute(),
            'Unable to create',
        );
    }

    getByNameOrNull(name: string): Promise<TSelectLocation | null> {
        return toEntityOrNull(
            this.db
                .select()
                .from(locations)
                .where(eq(locations.name, sql.placeholder('name')))
                .prepare('get_location_by_name')
                .execute({ name }),
        );
    }
}
