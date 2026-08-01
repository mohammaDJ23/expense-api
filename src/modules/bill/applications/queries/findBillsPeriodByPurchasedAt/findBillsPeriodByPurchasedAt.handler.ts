import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindBillsPeriodByPurchasedAtQuery } from './findBillsPeriodByPurchasedAt.query';

import type { IBillPeriod } from '@/modules/bill/domain/types/billPeriod.type';

@QueryHandler(FindBillsPeriodByPurchasedAtQuery)
export class FindBillsPeriodByPurchasedAtHandler implements IQueryHandler<
    FindBillsPeriodByPurchasedAtQuery,
    IBillPeriod
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindBillsPeriodByPurchasedAtQuery): Promise<IBillPeriod> {
        try {
            return await this.billRepository.findPeriodByPurchasedAt(query.props.userId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
