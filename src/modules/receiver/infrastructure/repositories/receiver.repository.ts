import { Injectable } from '@nestjs/common';
import { and, desc, eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toIsExistsByCount } from '@/infrastructure/database/drizzle/transformers/toIsExistsByCount.transformer';
import {
    receivers,
    type IInsertReceiver,
    type ISelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';

import type { IList } from '@/core/interfaces/list.interface';
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
                .execute(),
        );
    }

    findListByUserId(userId: string, options: IList): Promise<ISelectReceiver[]> {
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

    isExistsByUserIdAndId(userId: string, id: string): Promise<boolean> {
        return toIsExistsByCount(
            this.drizzleRepository.db.$count(
                receivers,
                and(eq(receivers.userId, userId), eq(receivers.id, id)),
            ),
        );
    }
}
