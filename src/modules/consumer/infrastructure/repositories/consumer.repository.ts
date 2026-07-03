import { Injectable } from '@nestjs/common';
import { and, eq, inArray, desc, ne } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toIsExistsByCount } from '@/infrastructure/database/drizzle/transformers/toIsExistsByCount.transformer';
import {
    consumers,
    type IInsertConsumer,
    type ISelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

import type { IList } from '@/core/interfaces/list.interface';
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

    findByUserIdAndNameOrNull(userId: string, name: string): Promise<ISelectConsumer | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(consumers)
                .where(and(eq(consumers.userId, userId), eq(consumers.name, name)))
                .execute(),
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

    findByUserIdAndIdOrNull(userId: string, id: string): Promise<ISelectConsumer | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(consumers)
                .where(and(eq(consumers.userId, userId), eq(consumers.id, id)))
                .execute(),
        );
    }

    findManyByUserIdAndIds(userId: string, ids: string[]): Promise<ISelectConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(consumers)
                .where(and(eq(consumers.userId, userId), inArray(consumers.id, ids)))
                .execute(),
        );
    }

    findListByUserId(userId: string, options: IList): Promise<ISelectConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(consumers)
                .where(eq(consumers.userId, userId))
                .orderBy(desc(consumers.createdAt))
                .limit(options.limit)
                .offset(options.offset)
                .execute(),
        );
    }

    isExistsByUserIdAndIds(userId: string, ids: string[]): Promise<boolean> {
        return toIsExistsByCount(
            this.drizzleRepository.db.$count(
                consumers,
                and(eq(consumers.userId, userId), inArray(consumers.id, ids)),
            ),
            ids.length,
        );
    }

    existsByUserIdAndId(userId: string, id: string): Promise<boolean> {
        return toIsExistsByCount(
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
        return toIsExistsByCount(
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
}
