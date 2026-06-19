import { Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    billsConsumers,
    type TInsertBillConsumer,
    type TSelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import { consumers } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

import type { IJoinedBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';
import type { IBillConsumerRepository } from '@/modules/consumer/domain/interfaces/billConsumerRepository.interface';

@Injectable()
export class BillConsumerRepository extends DrizzleRepository implements IBillConsumerRepository {
    createMany(data: TInsertBillConsumer[]): Promise<TSelectBillConsumer[]> {
        return toEntities(this.db.insert(billsConsumers).values(data).returning().execute());
    }

    getManyJoinedById(billIds: string[]): Promise<IJoinedBillConsumer[]> {
        return toEntities(
            this.db
                .select({
                    billId: billsConsumers.billId,
                    id: consumers.id,
                    name: consumers.name,
                    createdAt: consumers.createdAt,
                    updatedAt: consumers.updatedAt,
                })
                .from(billsConsumers)
                .innerJoin(consumers, eq(billsConsumers.consumerId, consumers.id))
                .where(inArray(billsConsumers.billId, billIds))
                .execute(),
        );
    }
}
