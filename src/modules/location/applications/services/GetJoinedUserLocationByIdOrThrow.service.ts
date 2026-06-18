import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetJoinedUserLocationByIdOrThrowQuery } from '@/modules/location/applications/queries/getJoinedUserLocationByIdOrThrow/getJoinedUserLocationByIdOrThrow.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class GetJoinedUserLocationByIdOrThrowService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, locationId: string): Promise<TSelectLocation> {
        try {
            const getJoinedUserLocationByIdOrThrowQuery = new GetJoinedUserLocationByIdOrThrowQuery(
                userId,
                locationId,
            );
            return await this.queryBus.execute<
                GetJoinedUserLocationByIdOrThrowQuery,
                TSelectLocation
            >(getJoinedUserLocationByIdOrThrowQuery);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
