import { Injectable } from '@nestjs/common';
import { and, asc, between, count, desc, eq, inArray, max, min, sql } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toCount } from '@/infrastructure/database/drizzle/transformers/toCount.transformer';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toExistsByCount } from '@/infrastructure/database/drizzle/transformers/toExistsByCount.transformer';
import {
    bills,
    type IInsertBill,
    type ISelectBill,
} from '@/modules/bill/infrastructure/schemas/bill.schema';
import { billsConsumers } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

import type { IListQuery } from '@/core/types/listQuery.type';
import type { IBillRepository } from '@/modules/bill/domain/interfaces/billRepository.interface';
import type { IBillPeriod } from '@/modules/bill/domain/types/billPeriod.type';
import type { IBillTimeline } from '@/modules/bill/domain/types/billTimeline.type';
import type { IMostUsed } from '@/modules/bill/domain/types/mostUsed.type';

@Injectable()
export class BillRepository implements IBillRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertBill): Promise<ISelectBill> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(bills).values(data).returning().execute(),
            'Unable to create',
        );
    }

    update(
        data: Partial<ISelectBill> & Required<Pick<ISelectBill, 'id' | 'userId'>>,
    ): Promise<ISelectBill> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .update(bills)
                .set(data)
                .where(and(eq(bills.userId, data.userId), eq(bills.id, data.id)))
                .returning()
                .execute(),
            'Unable to update',
        );
    }

    deleteByUserIdAndId(userId: string, id: string): Promise<ISelectBill> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .delete(bills)
                .where(and(eq(bills.userId, userId), eq(bills.id, id)))
                .returning()
                .execute(),
            'Unable to delete',
        );
    }

    existsByUserIdAndId(userId: string, id: string): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(
                bills,
                and(eq(bills.id, id), eq(bills.userId, userId)),
            ),
        );
    }

    findListByUserId(userId: string, options: IListQuery): Promise<ISelectBill[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(bills)
                .where(eq(bills.userId, userId))
                .orderBy(desc(bills.createdAt))
                .limit(options.limit)
                .offset(options.offset)
                .execute(),
        );
    }

    findByUserIdAndIdOrThrow(userId: string, id: string): Promise<ISelectBill> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select()
                .from(bills)
                .where(and(eq(bills.id, id), eq(bills.userId, userId)))
                .execute(),
            'Unable to find',
        );
    }

    findManyByUserIdAndIds(userId: string, ids: string[]): Promise<ISelectBill[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(bills)
                .where(and(eq(bills.userId, userId), inArray(bills.id, ids)))
                .orderBy(desc(bills.createdAt))
                .execute(),
        );
    }

    findTotalByUserId(userId: string): Promise<number> {
        return toCount(this.drizzleRepository.db.$count(bills, eq(bills.userId, userId)));
    }

    findMostUsedLocations(userId: string, limit: number): Promise<IMostUsed[]> {
        const total = count();
        return toEntities(
            this.drizzleRepository.db
                .select({
                    id: bills.locationId,
                    total,
                })
                .from(bills)
                .where(eq(bills.userId, userId))
                .groupBy(bills.locationId)
                .orderBy(desc(total))
                .limit(limit)
                .execute(),
        );
    }

    findMostUsedReceivers(userId: string, limit: number): Promise<IMostUsed[]> {
        const total = count();
        return toEntities(
            this.drizzleRepository.db
                .select({
                    id: bills.receiverId,
                    total,
                })
                .from(bills)
                .where(eq(bills.userId, userId))
                .groupBy(bills.receiverId)
                .orderBy(desc(total))
                .limit(limit)
                .execute(),
        );
    }

    findMostUsedConsumers(userId: string, limit: number): Promise<IMostUsed[]> {
        const total = count();
        return toEntities(
            this.drizzleRepository.db
                .select({
                    id: billsConsumers.consumerId,
                    total,
                })
                .from(bills)
                .innerJoin(billsConsumers, eq(billsConsumers.billId, bills.id))
                .where(eq(bills.userId, userId))
                .groupBy(billsConsumers.consumerId)
                .orderBy(desc(total))
                .limit(limit)
                .execute(),
        );
    }

    findPeriodByPurchasedAt(userId: string): Promise<IBillPeriod> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select({
                    start: min(bills.purchasedAt),
                    end: max(bills.purchasedAt),
                })
                .from(bills)
                .where(eq(bills.userId, userId))
                .execute(),
            'Unable to find the period',
        );
    }

    findTimelineByPurchasedAt(
        userId: string,
        start: string,
        end: string,
        clientTimezone: string,
    ): Promise<IBillTimeline[]> {
        const timezone = sql.raw(`'${clientTimezone}'`);
        const date = sql<string>`date(${bills.purchasedAt} AT TIME ZONE ${timezone})`;
        return toEntities(
            this.drizzleRepository.db
                .select({
                    date,
                    count: count(),
                })
                .from(bills)
                .where(and(eq(bills.userId, userId), between(bills.purchasedAt, start, end)))
                .groupBy(date)
                .orderBy(asc(date))
                .execute(),
        );
    }
}
