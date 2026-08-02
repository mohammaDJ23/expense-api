import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindBillsTimelineByPurchasedAtQuery } from './findBillsTimelineByPurchasedAt.query';

import type { IBillTimeline } from '@/modules/bill/domain/types/billTimeline.type';

@QueryHandler(FindBillsTimelineByPurchasedAtQuery)
export class FindBillsTimelineByPurchasedAtHandler implements IQueryHandler<
    FindBillsTimelineByPurchasedAtQuery,
    IBillTimeline[]
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindBillsTimelineByPurchasedAtQuery): Promise<IBillTimeline[]> {
        try {
            return await this.billRepository.findTimelineByPurchasedAt(
                query.props.userId,
                query.props.start,
                query.props.end,
                query.props.clientTimezone,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
