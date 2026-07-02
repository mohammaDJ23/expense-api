import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindBillByUserIdAndIdOrThrowQuery } from './findBillByUserIdAndIdOrThrow.query';

import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@QueryHandler(FindBillByUserIdAndIdOrThrowQuery)
export class FindBillByUserIdAndIdOrThrowHandler implements IQueryHandler<
    FindBillByUserIdAndIdOrThrowQuery,
    ISelectBill
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindBillByUserIdAndIdOrThrowQuery): Promise<ISelectBill> {
        try {
            return await this.billRepository.findByUserIdAndIdOrThrow(
                query.props.userId,
                query.props.id,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
