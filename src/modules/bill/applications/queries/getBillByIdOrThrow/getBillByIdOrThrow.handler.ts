import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetBillByIdOrThrowQuery } from '@/modules/bill/applications/queries/getBillByIdOrThrow/getBillByIdOrThrow.query';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@QueryHandler(GetBillByIdOrThrowQuery)
export class GetBillByIdOrThrowHandler implements IQueryHandler<GetBillByIdOrThrowQuery> {
    constructor(private readonly billRepository: BillRepository) {}

    execute(query: GetBillByIdOrThrowQuery): Promise<TSelectBill> {
        return this.billRepository.getByIdOrThrow(query.userId, query.billId);
    }
}
