import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetManyBillsQuery } from '@/modules/bill/applications/queries/getManyBills/getManyBills.query';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';

@QueryHandler(GetManyBillsQuery)
export class GetManyBillsHandler implements IQueryHandler<GetManyBillsQuery> {
    constructor(private readonly billRepository: BillRepository) {}

    execute(query: GetManyBillsQuery): Promise<IBill[]> {
        return this.billRepository.getMany(query.userId, query.offset, query.limit);
    }
}
