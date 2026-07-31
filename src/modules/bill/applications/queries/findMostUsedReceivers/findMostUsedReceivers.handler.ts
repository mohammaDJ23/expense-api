import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindMostUsedReceiversQuery } from './findMostUsedReceivers.query';

import type { IMostUsed } from '@/modules/bill/domain/types/mostUsed.type';

@QueryHandler(FindMostUsedReceiversQuery)
export class FindMostUsedReceiversHandler implements IQueryHandler<
    FindMostUsedReceiversQuery,
    IMostUsed[]
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindMostUsedReceiversQuery): Promise<IMostUsed[]> {
        try {
            return await this.billRepository.findMostUsedReceivers(
                query.props.userId,
                query.props.limit,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
