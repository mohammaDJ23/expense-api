import { Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toIsExistsByCount } from '@/infrastructure/database/drizzle/transformers/toIsExistsByCount.transformer';
import {
    bills,
    type IInsertBill,
    type ISelectBill,
} from '@/modules/bill/infrastructure/schemas/bill.schema';

import type { IList } from '@/core/interfaces/list.interface';
import type { IBillRepository } from '@/modules/bill/domain/interfaces/billRepository.interface';

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

    isExistsByUserIdAndId(userId: string, id: string): Promise<boolean> {
        return toIsExistsByCount(
            this.drizzleRepository.db.$count(
                bills,
                and(eq(bills.id, id), eq(bills.userId, userId)),
            ),
        );
    }

    findListByUserId(userId: string, options: IList): Promise<ISelectBill[]> {
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
}
