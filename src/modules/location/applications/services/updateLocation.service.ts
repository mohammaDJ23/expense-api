import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { UpdateLocationCommand } from '@/modules/location/applications/commands/updateLocation/updateLocation.command';
import { FindLocationByUserIdAndNameOrNullQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndNameOrNull/findLocationByUserIdAndNameOrNull.query';
import { IsLocationExistsByUserIdAndIdQuery } from '@/modules/location/applications/queries/isLocationExistsByUserIdAndId/isLocationExistsByUserIdAndId.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { UpdateLocationRequestDto } from '@/modules/location/interfaces/dtos/updateLocation.request.dto';

@Injectable()
export class UpdateLocationService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(userId: string, data: UpdateLocationRequestDto): Promise<IdEntity> {
        {
            const [isExists, foundedByName] = await Promise.all([
                this.queryBus.execute<IsLocationExistsByUserIdAndIdQuery, boolean>(
                    new IsLocationExistsByUserIdAndIdQuery(userId, data.id),
                ),
                this.queryBus.execute<
                    FindLocationByUserIdAndNameOrNullQuery,
                    ISelectLocation | null
                >(new FindLocationByUserIdAndNameOrNullQuery(userId, data.name)),
            ]);

            if (!isExists) {
                throw new BadRequestException('Could not found the location');
            }

            if (foundedByName) {
                throw new BadRequestException('The location already exists');
            }
        }

        {
            const updatedLocation = await this.commandBus.execute<
                UpdateLocationCommand,
                ISelectLocation
            >(
                new UpdateLocationCommand({
                    id: data.id,
                    name: data.name,
                    userId,
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );
            return IdEntity.create(updatedLocation.id);
        }
    }
}
