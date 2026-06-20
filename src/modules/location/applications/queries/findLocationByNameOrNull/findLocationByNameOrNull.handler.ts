import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { FindLocationByNameOrNullQuery } from './findLocationByNameOrNull.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindLocationByNameOrNullQuery)
export class FindLocationByNameOrNullHandler implements IQueryHandler<FindLocationByNameOrNullQuery> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: FindLocationByNameOrNullQuery): Promise<ISelectLocation | null> {
        try {
            return await this.locationRepository.findByNameOrNull(query.name);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
