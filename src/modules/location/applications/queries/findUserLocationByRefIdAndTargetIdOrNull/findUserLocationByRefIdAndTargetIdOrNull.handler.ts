import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { FindUserLocationByRefIdAndTargetIdOrNullQuery } from './findUserLocationByRefIdAndTargetIdOrNull.query';

import type { ISelectUserLocation } from '@/modules/location/infrastructure/schemas/userLocation.schema';

@QueryHandler(FindUserLocationByRefIdAndTargetIdOrNullQuery)
export class FindUserLocationByRefIdAndTargetIdOrNullHandler implements IQueryHandler<
    FindUserLocationByRefIdAndTargetIdOrNullQuery,
    ISelectUserLocation | null
> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    async execute(
        query: FindUserLocationByRefIdAndTargetIdOrNullQuery,
    ): Promise<ISelectUserLocation | null> {
        try {
            return await this.userLocationRepository.findByRefIdAndTargetIdOrNull(
                query.userId,
                query.locationId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
