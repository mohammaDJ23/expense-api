import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetManyBillsQuery } from '@/modules/bill/applications/queries/getManyBills/getManyBills.query';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@QueryHandler(GetManyBillsQuery)
export class GetManyBillsHandler implements IQueryHandler<GetManyBillsQuery> {
    constructor(private readonly billRepository: BillRepository) {}

    execute(query: GetManyBillsQuery): Promise<TSelectBill[]> {
        return this.billRepository.getMany(query.userId, query.offset, query.limit);
    }
}
