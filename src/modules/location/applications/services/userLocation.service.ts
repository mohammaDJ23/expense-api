import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateUserLocationCommand } from '@/modules/location/applications/commands/createUserLocation/createUserLocation.command';
import { GetUserLocationByIdOrNullQuery } from '@/modules/location/applications/queries/getUserLocationByIdOrNull/getUserLocationByIdOrNull.query';

import type { TSelectUserLocation } from '@/modules/location/infrastructure/schemas/userLocation.schema';

@Injectable()
export class UserLocationService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    create(userId: string, locationId: string): Promise<TSelectUserLocation> {
        try {
            const createUserLocationCommand = new CreateUserLocationCommand({
                userId,
                locationId,
                createdAt: new Date(),
            });
            return this.commandBus.execute<CreateUserLocationCommand, TSelectUserLocation>(
                createUserLocationCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    getByIdOrNull(userId: string, locationId: string): Promise<TSelectUserLocation | null> {
        try {
            const getUserLocationByIdOrNullQuery = new GetUserLocationByIdOrNullQuery(
                userId,
                locationId,
            );
            return this.queryBus.execute<
                GetUserLocationByIdOrNullQuery,
                TSelectUserLocation | null
            >(getUserLocationByIdOrNullQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    async createIfNotExists(userId: string, locationId: string): Promise<void> {
        const userLocation = await this.getByIdOrNull(userId, locationId);
        if (!userLocation) {
            await this.create(userId, locationId);
        }
    }
}
