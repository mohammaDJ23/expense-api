import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';

import { FindLocationByUserIdAndNameOrNullQuery } from './findLocationByUserIdAndNameOrNull.query';

import type { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindLocationByUserIdAndNameOrNullQuery)
export class FindLocationByUserIdAndNameOrNullHandler implements IQueryHandler<
    FindLocationByUserIdAndNameOrNullQuery,
    ISelectLocation | null
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: FindLocationByUserIdAndNameOrNullQuery): Promise<ISelectLocation | null> {
        try {
            return await this.locationRepository.findByUserIdAndNameOrNull(
                query.userId,
                query.name,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
