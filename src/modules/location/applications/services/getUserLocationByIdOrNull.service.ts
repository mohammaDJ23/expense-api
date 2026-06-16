import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetUserLocationByIdOrNullQuery } from '@/modules/location/applications/queries/getUserLocationByIdOrNull/getUserLocationByIdOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUserLocation } from '@/modules/location/infrastructure/schemas/userLocation.schema';

@Injectable()
export class GetUserLocationByIdOrNullService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, locationId: string): Promise<TSelectUserLocation | null> {
        try {
            const getUserLocationByIdOrNullQuery = new GetUserLocationByIdOrNullQuery(
                userId,
                locationId,
            );
            return await this.queryBus.execute<
                GetUserLocationByIdOrNullQuery,
                TSelectUserLocation | null
            >(getUserLocationByIdOrNullQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
