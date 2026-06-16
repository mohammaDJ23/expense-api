import { Injectable } from '@nestjs/common';

import { CreateUserLocationService } from './createUserLocation.service';
import { GetUserLocationByIdOrNullService } from './getUserLocationByIdOrNull.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';

@Injectable()
export class CreateUserLocationIfNotExistsService implements IServiceHandler {
    constructor(
        private readonly createUserLocationService: CreateUserLocationService,
        private readonly getUserLocationByIdOrNullService: GetUserLocationByIdOrNullService,
    ) {}

    async execute(userId: string, locationId: string): Promise<void> {
        const userLocation = await this.getUserLocationByIdOrNullService.execute(
            userId,
            locationId,
        );
        if (!userLocation) {
            await this.createUserLocationService.execute(userId, locationId);
        }
    }
}
