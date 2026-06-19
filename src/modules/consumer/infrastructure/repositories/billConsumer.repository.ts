import { Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    billsConsumers,
    type TInsertBillConsumer,
    type TSelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import {
    consumers,
    type TSelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

import type { IBillConsumerRepository } from '@/modules/consumer/domain/interfaces/billConsumerRepository.interface';

@Injectable()
export class BillConsumerRepository extends DrizzleRepository implements IBillConsumerRepository {
    createMany(data: TInsertBillConsumer[]): Promise<TSelectBillConsumer[]> {
        return toEntities(
            this.db
                .insert(billsConsumers)
                .values(data)
                .returning()
                .prepare('create_many_bills_consumers')
                .execute(),
        );
    }

    getManyJoinedById(billId: string): Promise<TSelectConsumer[]> {
        return toEntities(
            this.db
                .select({
                    id: consumers.id,
                    name: consumers.name,
                    createdAt: consumers.createdAt,
                    updatedAt: consumers.updatedAt,
                })
                .from(billsConsumers)
                .innerJoin(consumers, eq(billsConsumers.consumerId, consumers.id))
                .where(eq(billsConsumers.billId, sql.placeholder('billId')))
                .prepare('get_many_joined_bills_consumers_by_id')
                .execute({ billId }),
        );
    }
}
