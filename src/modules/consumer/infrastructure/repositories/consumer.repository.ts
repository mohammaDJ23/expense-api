import { Injectable } from '@nestjs/common';
import { and, eq, inArray, desc, ne, or, lt } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toCount } from '@/infrastructure/database/drizzle/transformers/toCount.transformer';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toExistsByCount } from '@/infrastructure/database/drizzle/transformers/toExistsByCount.transformer';
import {
    consumers,
    type IInsertConsumer,
    type ISelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

import type { ICursor } from '@/core/utils/pagination/cursor.type';
import type { IConsumerRepository } from '@/modules/consumer/domain/interfaces/consumerRepository.interface';

@Injectable()
export class ConsumerRepository implements IConsumerRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertConsumer): Promise<ISelectConsumer> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(consumers).values(data).returning().execute(),
            'Unable to create',
        );
    }

    update(
        data: IInsertConsumer & Required<Pick<IInsertConsumer, 'id'>>,
    ): Promise<ISelectConsumer> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .update(consumers)
                .set(data)
                .where(and(eq(consumers.userId, data.userId), eq(consumers.id, data.id)))
                .returning()
                .execute(),
            'Unable to update',
        );
    }

    deleteByUserIdAndId(userId: string, id: string): Promise<ISelectConsumer> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .delete(consumers)
                .where(and(eq(consumers.userId, userId), eq(consumers.id, id)))
                .returning()
                .execute(),
            'Unable to delete',
        );
    }

    findByUserIdAndIdOrThrow(userId: string, id: string): Promise<ISelectConsumer> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select()
                .from(consumers)
                .where(and(eq(consumers.userId, userId), eq(consumers.id, id)))
                .execute(),
            'Unable to find',
        );
    }

    findManyByUserIdAndIds(userId: string, ids: string[]): Promise<ISelectConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(consumers)
                .where(and(eq(consumers.userId, userId), inArray(consumers.id, ids)))
                .orderBy(desc(consumers.createdAt))
                .execute(),
        );
    }

    findListByUserId(
        userId: string,
        limit: number,
        cursor: ICursor | null,
    ): Promise<ISelectConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(consumers)
                .where(
                    and(
                        eq(consumers.userId, userId),
                        cursor
                            ? or(
                                  lt(consumers.createdAt, cursor.createdAt),
                                  and(
                                      eq(consumers.createdAt, cursor.createdAt),
                                      lt(consumers.id, cursor.id),
                                  ),
                              )
                            : undefined,
                    ),
                )
                .orderBy(desc(consumers.createdAt), desc(consumers.id))
                .limit(limit + 1)
                .execute(),
        );
    }

    existsByUserIdAndIds(userId: string, ids: string[]): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(
                consumers,
                and(eq(consumers.userId, userId), inArray(consumers.id, ids)),
            ),
            ids.length,
        );
    }

    existsByUserIdAndId(userId: string, id: string): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(
                consumers,
                and(eq(consumers.userId, userId), eq(consumers.id, id)),
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
                consumers,
                and(
                    eq(consumers.userId, userId),
                    ne(consumers.id, excludingId),
                    eq(consumers.name, name),
                ),
            ),
        );
    }

    existsByUserIdAndName(userId: string, name: string): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(
                consumers,
                and(eq(consumers.userId, userId), eq(consumers.name, name)),
            ),
        );
    }

    findTotalByUserId(userId: string): Promise<number> {
        return toCount(this.drizzleRepository.db.$count(consumers, eq(consumers.userId, userId)));
    }
}
