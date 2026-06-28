import { Injectable } from '@nestjs/common';
import { and, desc, eq, inArray } from 'drizzle-orm';

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

import type { IList } from '@/core/interfaces/list.interface';
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

    update(
        data: IInsertLocation & Required<Pick<IInsertLocation, 'id'>>,
    ): Promise<ISelectLocation> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .update(locations)
                .set(data)
                .where(and(eq(locations.userId, data.userId), eq(locations.id, data.id)))
                .returning()
                .execute(),
            'Unable to update',
        );
    }

    deleteByUserIdAndId(userId: string, id: string): Promise<ISelectLocation> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .delete(locations)
                .where(and(eq(locations.userId, userId), eq(locations.id, id)))
                .returning()
                .execute(),
            'Unable to delete',
        );
    }

    findByUserIdAndNameOrNull(userId: string, name: string): Promise<ISelectLocation | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(locations)
                .where(and(eq(locations.userId, userId), eq(locations.name, name)))
                .execute(),
        );
    }

    findByUserIdAndIdOrThrow(userId: string, id: string): Promise<ISelectLocation> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select()
                .from(locations)
                .where(and(eq(locations.userId, userId), eq(locations.id, id)))
                .execute(),
            'Unable to find',
        );
    }

    findByUserIdAndIdOrNull(userId: string, id: string): Promise<ISelectLocation | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(locations)
                .where(and(eq(locations.userId, userId), eq(locations.id, id)))
                .execute(),
        );
    }

    findManyByUserIdAndIds(userId: string, ids: string[]): Promise<ISelectLocation[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(locations)
                .where(and(eq(locations.userId, userId), inArray(locations.id, ids)))
                .orderBy(desc(locations.createdAt))
                .execute(),
        );
    }

    findListByUserId(userId: string, options: IList): Promise<ISelectLocation[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(locations)
                .where(eq(locations.userId, userId))
                .orderBy(desc(locations.createdAt))
                .limit(options.limit)
                .offset(options.offset)
                .execute(),
        );
    }

    isExistsByUserIdAndId(userId: string, id: string): Promise<boolean> {
        return toIsExistsByCount(
            this.drizzleRepository.db.$count(
                locations,
                and(eq(locations.userId, userId), eq(locations.id, id)),
            ),
        );
    }
}
