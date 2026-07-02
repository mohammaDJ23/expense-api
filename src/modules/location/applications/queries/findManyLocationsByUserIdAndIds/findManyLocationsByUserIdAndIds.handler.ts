import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { FindManyLocationsByUserIdAndIdsQuery } from './findManyLocationsByUserIdAndIds.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindManyLocationsByUserIdAndIdsQuery)
export class FindManyLocationsByUserIdAndIdsHandler implements IQueryHandler<
    FindManyLocationsByUserIdAndIdsQuery,
    ISelectLocation[]
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: FindManyLocationsByUserIdAndIdsQuery): Promise<ISelectLocation[]> {
        try {
            return await this.locationRepository.findManyByUserIdAndIds(
                query.props.userId,
                query.props.ids,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
