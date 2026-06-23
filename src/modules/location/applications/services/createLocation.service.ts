import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateLocationCommand } from '@/modules/location/applications/commands/createLocation/createLocation.command';
import { CreateUserLocationCommand } from '@/modules/location/applications/commands/createUserLocation/createUserLocation.command';
import { FindLocationByNameOrNullQuery } from '@/modules/location/applications/queries/findLocationByNameOrNull/findLocationByNameOrNull.query';
import { FindUserLocationByRefIdAndTargetIdOrNullQuery } from '@/modules/location/applications/queries/findUserLocationByRefIdAndTargetIdOrNull/findUserLocationByRefIdAndTargetIdOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { ISelectUserLocation } from '@/modules/location/infrastructure/schemas/userLocation.schema';

@Injectable()
export class CreateLocationService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, name: string): Promise<IdEntity> {
        const location = await this.queryBus.execute<
            FindLocationByNameOrNullQuery,
            ISelectLocation | null
        >(new FindLocationByNameOrNullQuery(name));

        if (!location) {
            const createdLocation = await this.commandBus.execute<
                CreateLocationCommand,
                ISelectLocation
            >(
                new CreateLocationCommand({
                    name,
                    createdAt: getCurrentUTCTimestamp(),
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );
            await this.commandBus.execute<CreateUserLocationCommand, ISelectUserLocation>(
                new CreateUserLocationCommand({
                    userId,
                    locationId: createdLocation.id,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );
            return IdEntity.create(createdLocation.id);
        }

        const userLocation = await this.queryBus.execute<
            FindUserLocationByRefIdAndTargetIdOrNullQuery,
            ISelectUserLocation | null
        >(new FindUserLocationByRefIdAndTargetIdOrNullQuery(userId, location.id));

        if (!userLocation) {
            await this.commandBus.execute<CreateUserLocationCommand, ISelectUserLocation>(
                new CreateUserLocationCommand({
                    userId,
                    locationId: location.id,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );
            return IdEntity.create(location.id);
        }

        throw new BadRequestException('You already have the location');
    }
}
