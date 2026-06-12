import { Injectable } from '@nestjs/common';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    bills,
    type TInsertBill,
    type TSelectBill,
} from '@/modules/bill/infrastructure/schemas/bill.schema';

import type { IBillRepository } from '@/modules/bill/domain/interfaces/billRepository.interface';

@Injectable()
export class BillRepository extends DrizzleRepository implements IBillRepository {
    create(data: TInsertBill): Promise<TSelectBill> {
        return toEntityOrThrow(this.db.insert(bills).values(data).returning(), 'Unable to create');
    }
}
