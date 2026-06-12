import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateLocationCommand } from '@/modules/location/applications/commands/createLocation/createLocation.command';
import { GetLocationByNameOrNullQuery } from '@/modules/location/applications/queries/getLocationByNameOrNull/getLocationByNameOrNull.query';

import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class LocationService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    create(name: string): Promise<TSelectLocation> {
        try {
            const createLocationCommand = new CreateLocationCommand({
                name,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return this.commandBus.execute<CreateLocationCommand, TSelectLocation>(
                createLocationCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    getByNameOrNull(name: string): Promise<TSelectLocation | null> {
        try {
            const getLocationByNameOrNullQuery = new GetLocationByNameOrNullQuery(name);
            return this.queryBus.execute<GetLocationByNameOrNullQuery, TSelectLocation | null>(
                getLocationByNameOrNullQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    async getOrCreate(name: string): Promise<TSelectLocation> {
        const location = await this.getByNameOrNull(name);
        if (location) {
            return location;
        }
        return this.create(name);
    }
}
