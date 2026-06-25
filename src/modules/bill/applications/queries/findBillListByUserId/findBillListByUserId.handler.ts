import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindBillListByUserIdQuery } from './findBillListByUserId.query';

import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@QueryHandler(FindBillListByUserIdQuery)
export class FindBillListByUserIdHandler implements IQueryHandler<
    FindBillListByUserIdQuery,
    ISelectBill[]
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindBillListByUserIdQuery): Promise<ISelectBill[]> {
        try {
            return await this.billRepository.findListByUserId(query.userId, {
                offset: query.offset,
                limit: query.limit,
            });
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
