import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindMostUsedLocationsQuery } from './findMostUsedLocations.query';

import type { IMostUsed } from '@/modules/bill/domain/types/mostUsed.type';

@QueryHandler(FindMostUsedLocationsQuery)
export class FindMostUsedLocationsHandler implements IQueryHandler<
    FindMostUsedLocationsQuery,
    IMostUsed[]
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindMostUsedLocationsQuery): Promise<IMostUsed[]> {
        try {
            return await this.billRepository.findMostUsedLocations(
                query.props.userId,
                query.props.limit,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
