import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { FindLocationByUserIdAndIdOrThrowQuery } from './findLocationByUserIdAndIdOrThrow.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindLocationByUserIdAndIdOrThrowQuery)
export class FindLocationByUserIdAndIdOrThrowHandler implements IQueryHandler<
    FindLocationByUserIdAndIdOrThrowQuery,
    ISelectLocation
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: FindLocationByUserIdAndIdOrThrowQuery): Promise<ISelectLocation> {
        try {
            return await this.locationRepository.findByUserIdAndIdOrThrow(
                query.props.userId,
                query.props.id,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
