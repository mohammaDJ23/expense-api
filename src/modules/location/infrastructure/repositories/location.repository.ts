import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    locations,
    type IInsertLocation,
    type ISelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';

import type { ILocationRepository } from '@/modules/location/domain/interfaces/locationRepository.interface';

@Injectable()
export class LocationRepository implements ILocationRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertLocation): Promise<ISelectLocation> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(locations).values(data).returning().execute(),
            'Unable to create',
        );
    }

    findByNameOrNull(name: string): Promise<ISelectLocation | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(locations)
                .where(eq(locations.name, name))
                .execute(),
        );
    }
}
