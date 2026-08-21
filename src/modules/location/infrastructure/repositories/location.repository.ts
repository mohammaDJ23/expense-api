import { Injectable } from '@nestjs/common';
import { and, desc, eq, inArray, lt, ne, or } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toCount } from '@/infrastructure/database/drizzle/transformers/toCount.transformer';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toExistsByCount } from '@/infrastructure/database/drizzle/transformers/toExistsByCount.transformer';
import {
    locations,
    type IInsertLocation,
    type ISelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';

import type { ILocationRepository } from '@/modules/location/domain/interfaces/locationRepository.interface';
import type { ILocationListCursor } from '@/modules/location/domain/types/locationListCursor.type';

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

    findListByUserId(
        userId: string,
        limit: number,
        cursor: ILocationListCursor | null,
    ): Promise<ISelectLocation[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(locations)
                .where(
                    and(
                        eq(locations.userId, userId),
                        cursor
                            ? or(
                                  lt(locations.createdAt, cursor.createdAt),
                                  and(
                                      eq(locations.createdAt, cursor.createdAt),
                                      lt(locations.id, cursor.id),
                                  ),
                              )
                            : undefined,
                    ),
                )
                .orderBy(desc(locations.createdAt), desc(locations.id))
                .limit(limit + 1)
                .execute(),
        );
    }

    existsByUserIdAndId(userId: string, id: string): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(
                locations,
                and(eq(locations.userId, userId), eq(locations.id, id)),
            ),
        );
    }

    existsByUserIdAndExcludingIdAndName(
        userId: string,
        excludingId: string,
        name: string,
    ): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(
                locations,
                and(
                    eq(locations.userId, userId),
                    ne(locations.id, excludingId),
                    eq(locations.name, name),
                ),
            ),
        );
    }

    existsByUserIdAndName(userId: string, name: string): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(
                locations,
                and(eq(locations.userId, userId), eq(locations.name, name)),
            ),
        );
    }

    findTotalByUserId(userId: string): Promise<number> {
        return toCount(this.drizzleRepository.db.$count(locations, eq(locations.userId, userId)));
    }
}
