import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { FindUserLocationTargetByRefIdAndTargetIdOrThrowQuery } from './findUserLocationTargetByRefIdAndTargetIdOrThrow.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindUserLocationTargetByRefIdAndTargetIdOrThrowQuery)
export class FindUserLocationTargetByRefIdAndTargetIdOrThrowHandler implements IQueryHandler<
    FindUserLocationTargetByRefIdAndTargetIdOrThrowQuery,
    ISelectLocation
> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    async execute(
        query: FindUserLocationTargetByRefIdAndTargetIdOrThrowQuery,
    ): Promise<ISelectLocation> {
        try {
            return await this.userLocationRepository.findTargetByRefIdAndTargetIdOrThrow(
                query.userId,
                query.locationId,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
