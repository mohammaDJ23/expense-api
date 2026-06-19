import { Injectable } from '@nestjs/common';
import { and, desc, eq, sql } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities, toEntityOrThrow } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    bills,
    type TInsertBill,
    type TSelectBill,
} from '@/modules/bill/infrastructure/schemas/bill.schema';

import type { IBillRepository } from '@/modules/bill/domain/interfaces/billRepository.interface';

@Injectable()
export class BillRepository extends DrizzleRepository implements IBillRepository {
    create(data: TInsertBill): Promise<TSelectBill> {
        return toEntityOrThrow(
            this.db.insert(bills).values(data).returning().prepare('create_bill').execute(),
            'Unable to create',
        );
    }

    getMany(userId: string, offset: number, limit: number): Promise<TSelectBill[]> {
        return toEntities(
            this.db
                .select()
                .from(bills)
                .where(eq(bills.userId, sql.placeholder('userId')))
                .orderBy(desc(bills.createdAt))
                .limit(sql.placeholder('limit'))
                .offset(sql.placeholder('offset'))
                .prepare('get_many_bills')
                .execute({ limit, offset, userId }),
        );
    }

    getByIdOrThrow(userId: string, billId: string): Promise<TSelectBill> {
        return toEntityOrThrow(
            this.db
                .select()
                .from(bills)
                .where(
                    and(
                        eq(bills.id, sql.placeholder('billId')),
                        eq(bills.userId, sql.placeholder('userId')),
                    ),
                )
                .prepare('get_bill_by_id')
                .execute({ userId, billId }),
            'Unable to find',
        );
    }
}
