import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { FindLocationByIdOrThrowQuery } from './findLocationByIdOrThrow.query';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@QueryHandler(FindLocationByIdOrThrowQuery)
export class FindLocationByIdOrThrowHandler implements IQueryHandler<
    FindLocationByIdOrThrowQuery,
    ISelectLocation
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(query: FindLocationByIdOrThrowQuery): Promise<ISelectLocation> {
        try {
            return await this.locationRepository.findByIdOrThrow(query.id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
