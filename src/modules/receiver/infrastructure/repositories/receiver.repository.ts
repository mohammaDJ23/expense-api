import { Injectable } from '@nestjs/common';
import { and, desc, eq, inArray, ne } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toCount } from '@/infrastructure/database/drizzle/transformers/toCount.transformer';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toExistsByCount } from '@/infrastructure/database/drizzle/transformers/toExistsByCount.transformer';
import {
    receivers,
    type IInsertReceiver,
    type ISelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';

import type { IListQuery } from '@/core/types/listQuery.interface';
import type { IReceiverRepository } from '@/modules/receiver/domain/interfaces/receiverRepository.interface';

@Injectable()
export class ReceiverRepository implements IReceiverRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertReceiver): Promise<ISelectReceiver> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(receivers).values(data).returning().execute(),
            'Unable to create',
        );
    }

    update(
        data: IInsertReceiver & Required<Pick<IInsertReceiver, 'id'>>,
    ): Promise<ISelectReceiver> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .update(receivers)
                .set(data)
                .where(and(eq(receivers.userId, data.userId), eq(receivers.id, data.id)))
                .returning()
                .execute(),
            'Unable to update',
        );
    }

    deleteByUserIdAndId(userId: string, id: string): Promise<ISelectReceiver> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .delete(receivers)
                .where(and(eq(receivers.userId, userId), eq(receivers.id, id)))
                .returning()
                .execute(),
            'Unable to delete',
        );
    }

    findByUserIdAndNameOrNull(userId: string, name: string): Promise<ISelectReceiver | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(receivers)
                .where(and(eq(receivers.userId, userId), eq(receivers.name, name)))
                .execute(),
        );
    }

    findByUserIdAndIdOrThrow(userId: string, id: string): Promise<ISelectReceiver> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select()
                .from(receivers)
                .where(and(eq(receivers.userId, userId), eq(receivers.id, id)))
                .execute(),
            'Unable to find',
        );
    }

    findByUserIdAndIdOrNull(userId: string, id: string): Promise<ISelectReceiver | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(receivers)
                .where(and(eq(receivers.userId, userId), eq(receivers.id, id)))
                .execute(),
        );
    }

    findManyByUserIdAndIds(userId: string, ids: string[]): Promise<ISelectReceiver[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(receivers)
                .where(and(eq(receivers.userId, userId), inArray(receivers.id, ids)))
                .orderBy(desc(receivers.createdAt))
                .execute(),
        );
    }

    findListByUserId(userId: string, options: IListQuery): Promise<ISelectReceiver[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(receivers)
                .where(eq(receivers.userId, userId))
                .orderBy(desc(receivers.createdAt))
                .limit(options.limit)
                .offset(options.offset)
                .execute(),
        );
    }

    existsByUserIdAndId(userId: string, id: string): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(
                receivers,
                and(eq(receivers.userId, userId), eq(receivers.id, id)),
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
                receivers,
                and(
                    eq(receivers.userId, userId),
                    ne(receivers.id, excludingId),
                    eq(receivers.name, name),
                ),
            ),
        );
    }

    existsByUserIdAndName(userId: string, name: string): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(
                receivers,
                and(eq(receivers.userId, userId), eq(receivers.name, name)),
            ),
        );
    }

    findTotalByUserId(userId: string): Promise<number> {
        return toCount(this.drizzleRepository.db.$count(receivers, eq(receivers.userId, userId)));
    }
}
