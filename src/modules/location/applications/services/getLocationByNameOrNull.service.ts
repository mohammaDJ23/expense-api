import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetLocationByNameOrNullQuery } from '@/modules/location/applications/queries/getLocationByNameOrNull/getLocationByNameOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class GetLocationByNameOrNullService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(name: string): Promise<TSelectLocation | null> {
        try {
            const getLocationByNameOrNullQuery = new GetLocationByNameOrNullQuery(name);
            return await this.queryBus.execute<
                GetLocationByNameOrNullQuery,
                TSelectLocation | null
            >(getLocationByNameOrNullQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
