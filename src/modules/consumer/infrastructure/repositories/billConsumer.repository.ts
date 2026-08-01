import { Injectable } from '@nestjs/common';
import { and, desc, eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import {
    billsConsumers,
    type IInsertBillConsumer,
    type ISelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import { consumers } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

import type { IBillConsumerRepository } from '@/modules/consumer/domain/interfaces/billConsumerRepository.interface';
import type { ITargetBillConsumer } from '@/modules/consumer/domain/types/billConsumer.type';

@Injectable()
export class BillConsumerRepository implements IBillConsumerRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    createMany(data: IInsertBillConsumer[]): Promise<ISelectBillConsumer[]> {
        return toEntities(
            this.drizzleRepository.db.insert(billsConsumers).values(data).returning().execute(),
        );
    }

    deleteManyByRefIdAndTargetIds(
        refId: string,
        targetIds: string[],
    ): Promise<ISelectBillConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .delete(billsConsumers)
                .where(
                    and(
                        eq(billsConsumers.billId, refId),
                        inArray(billsConsumers.consumerId, targetIds),
                    ),
                )
                .returning()
                .execute(),
        );
    }

    findManyByRefId(refId: string): Promise<ISelectBillConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(billsConsumers)
                .where(eq(billsConsumers.billId, refId))
                .orderBy(desc(billsConsumers.createdAt))
                .execute(),
        );
    }

    findManyTargetsByRefIds(refIds: string[]): Promise<ITargetBillConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select({
                    billId: billsConsumers.billId,
                    id: consumers.id,
                    name: consumers.name,
                    userId: consumers.userId,
                    createdAt: consumers.createdAt,
                    updatedAt: consumers.updatedAt,
                })
                .from(billsConsumers)
                .innerJoin(consumers, eq(billsConsumers.consumerId, consumers.id))
                .where(inArray(billsConsumers.billId, refIds))
                .orderBy(desc(billsConsumers.createdAt))
                .execute(),
        );
    }
}
