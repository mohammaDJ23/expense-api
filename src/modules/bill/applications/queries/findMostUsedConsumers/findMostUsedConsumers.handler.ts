import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindMostUsedConsumersQuery } from './findMostUsedConsumers.query';

import type { IMostUsed } from '@/modules/bill/domain/types/mostUsed.type';

@QueryHandler(FindMostUsedConsumersQuery)
export class FindMostUsedConsumersHandler implements IQueryHandler<
    FindMostUsedConsumersQuery,
    IMostUsed[]
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindMostUsedConsumersQuery): Promise<IMostUsed[]> {
        try {
            return await this.billRepository.findMostUsedConsumers(
                query.props.userId,
                query.props.limit,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
