import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { IdEntity } from '@/core/entities/id.entity';
import { DeleteLocationCommand } from '@/modules/location/applications/commands/deleteLocation/deleteLocation.command';
import { IsLocationExistsByUserIdAndIdQuery } from '@/modules/location/applications/queries/isLocationExistsByUserIdAndId/isLocationExistsByUserIdAndId.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class DeleteLocationService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(userId: string, locationId: string): Promise<IdEntity> {
        {
            const isExists = await this.queryBus.execute<
                IsLocationExistsByUserIdAndIdQuery,
                boolean
            >(new IsLocationExistsByUserIdAndIdQuery(userId, locationId));

            if (!isExists) {
                throw new BadRequestException('Could not found the location');
            }
        }

        {
            const deletedLocation = await this.commandBus.execute<
                DeleteLocationCommand,
                ISelectLocation
            >(new DeleteLocationCommand(userId, locationId));
            return IdEntity.create(deletedLocation.id);
        }
    }
}
