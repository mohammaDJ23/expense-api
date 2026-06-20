import { Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    billsConsumers,
    type IInsertBillConsumer,
    type ISelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import { consumers } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

import type { ITargetBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';
import type { IBillConsumerRepository } from '@/modules/consumer/domain/interfaces/billConsumerRepository.interface';

@Injectable()
export class BillConsumerRepository implements IBillConsumerRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    createMany(data: IInsertBillConsumer[]): Promise<ISelectBillConsumer[]> {
        return toEntities(
            this.drizzleRepository.db.insert(billsConsumers).values(data).returning().execute(),
        );
    }

    findTargetsByRefIds(refIds: string[]): Promise<ITargetBillConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select({
                    billId: billsConsumers.billId,
                    id: consumers.id,
                    name: consumers.name,
                    createdAt: consumers.createdAt,
                    updatedAt: consumers.updatedAt,
                })
                .from(billsConsumers)
                .innerJoin(consumers, eq(billsConsumers.consumerId, consumers.id))
                .where(inArray(billsConsumers.billId, refIds))
                .execute(),
        );
    }
}
