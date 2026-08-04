import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindManyBillsByUserIdQuery } from './findManyBillsByUserId.query';

import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@QueryHandler(FindManyBillsByUserIdQuery)
export class FindManyBillsByUserIdHandler implements IQueryHandler<
    FindManyBillsByUserIdQuery,
    ISelectBill[]
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindManyBillsByUserIdQuery): Promise<ISelectBill[]> {
        try {
            return await this.billRepository.findManyByUserId(query.props.userId);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
