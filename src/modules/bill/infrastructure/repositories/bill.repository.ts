import { Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities, toEntityOrThrow } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    bills,
    type TInsertBill,
    type TSelectBill,
} from '@/modules/bill/infrastructure/schemas/bill.schema';

import type { IBillRepository } from '@/modules/bill/domain/interfaces/billRepository.interface';

@Injectable()
export class BillRepository implements IBillRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: TInsertBill): Promise<TSelectBill> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(bills).values(data).returning().execute(),
            'Unable to create',
        );
    }

    getMany(userId: string, offset: number, limit: number): Promise<TSelectBill[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(bills)
                .where(eq(bills.userId, userId))
                .orderBy(desc(bills.createdAt))
                .limit(limit)
                .offset(offset)
                .execute(),
        );
    }

    getByIdOrThrow(userId: string, billId: string): Promise<TSelectBill> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select()
                .from(bills)
                .where(and(eq(bills.id, billId), eq(bills.userId, userId)))
                .execute(),
            'Unable to find',
        );
    }
}
