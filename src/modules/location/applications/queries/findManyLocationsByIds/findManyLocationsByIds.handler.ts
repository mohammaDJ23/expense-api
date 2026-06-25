import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { FindManyLocationsByIdsQuery } from './findManyLocationsByIds.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindManyLocationsByIdsQuery)
export class FindManyLocationsByIdsHandler implements IQueryHandler<
    FindManyLocationsByIdsQuery,
    ISelectLocation[]
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: FindManyLocationsByIdsQuery): Promise<ISelectLocation[]> {
        try {
            return await this.locationRepository.findManyByIds(query.ids);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
