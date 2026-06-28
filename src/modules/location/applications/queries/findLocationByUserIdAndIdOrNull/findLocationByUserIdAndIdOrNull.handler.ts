import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';

import { FindLocationByUserIdAndIdOrNullQuery } from './findLocationByUserIdAndIdOrNull.query';

import type { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindLocationByUserIdAndIdOrNullQuery)
export class FindLocationByUserIdAndIdOrNullHandler implements IQueryHandler<
    FindLocationByUserIdAndIdOrNullQuery,
    ISelectLocation | null
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: FindLocationByUserIdAndIdOrNullQuery): Promise<ISelectLocation | null> {
        try {
            return await this.locationRepository.findByUserIdAndIdOrNull(
                query.userId,
                query.locationId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
