import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindManyBillsByUserIdAndIdsQuery } from './findManyBillsByUserIdAndIds.query';

import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@QueryHandler(FindManyBillsByUserIdAndIdsQuery)
export class FindManyBillsByUserIdAndIdsHandler implements IQueryHandler<
    FindManyBillsByUserIdAndIdsQuery,
    ISelectBill[]
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindManyBillsByUserIdAndIdsQuery): Promise<ISelectBill[]> {
        try {
            return await this.billRepository.findManyByUserIdAndIds(
                query.props.userId,
                query.props.ids,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
