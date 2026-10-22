import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindBillsTotalAmountByUserIdOrThrowQuery } from './findBillsTotalAmountByUserIdOrThrow.query';

import type { ITotalAmount } from '@/modules/bill/domain/types/totalAmount.type';

@QueryHandler(FindBillsTotalAmountByUserIdOrThrowQuery)
export class FindBillsTotalAmountByUserIdOrThrowHandler implements IQueryHandler<
    FindBillsTotalAmountByUserIdOrThrowQuery,
    ITotalAmount
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindBillsTotalAmountByUserIdOrThrowQuery): Promise<ITotalAmount> {
        try {
            return await this.billRepository.findTotalAmountByUserIdOrThrow(query.props.userId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
