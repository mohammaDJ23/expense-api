import { Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toIsExistsByCount } from '@/infrastructure/database/drizzle/transformers/toIsExistsByCount.transformer';
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

    findByIdOrThrow(id: string): Promise<ISelectLocation> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select()
                .from(locations)
                .where(eq(locations.id, id))
                .execute(),
            'Unable to find',
        );
    }

    isExistsById(id: string): Promise<boolean> {
        return toIsExistsByCount(this.drizzleRepository.db.$count(locations, eq(locations.id, id)));
    }

    findManyByIds(ids: string[]): Promise<ISelectLocation[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(locations)
                .where(inArray(locations.id, ids))
                .execute(),
        );
    }
}
