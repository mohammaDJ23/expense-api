import { Injectable } from '@nestjs/common';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    billsConsumers,
    type TInsertBillConsumer,
    type TSelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

import type { IBillConsumerRepository } from '@/modules/consumer/domain/interfaces/billConsumerRepository.interface';

@Injectable()
export class BillConsumerRepository extends DrizzleRepository implements IBillConsumerRepository {
    createMany(data: TInsertBillConsumer[]): Promise<TSelectBillConsumer[]> {
        return toEntities(this.db.insert(billsConsumers).values(data).returning());
    }
}
