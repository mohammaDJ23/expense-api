import { Injectable } from '@nestjs/common';

import { CreateLocationService } from './createLocation.service';
import { GetLocationByNameOrNullService } from './getLocationByNameOrNull.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class GetLocationByNameOrCreateService implements IServiceHandler {
    constructor(
        private readonly createLocationService: CreateLocationService,
        private readonly getLocationByNameOrNullService: GetLocationByNameOrNullService,
    ) {}

    async execute(name: string): Promise<TSelectLocation> {
        const location = await this.getLocationByNameOrNullService.execute(name);
        if (location) {
            return location;
        }
        return this.createLocationService.execute(name);
    }
}
