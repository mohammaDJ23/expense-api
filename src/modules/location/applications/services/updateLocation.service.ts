import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { UpdateLocationCommand } from '@/modules/location/applications/commands/updateLocation/updateLocation.command';
import { ExistsLocationByUserIdAndExcludingIdAndNameQuery } from '@/modules/location/applications/queries/existsLocationByUserIdAndExcludingIdAndName/existsLocationByUserIdAndExcludingIdAndName.query';
import { IsLocationExistsByUserIdAndIdQuery } from '@/modules/location/applications/queries/isLocationExistsByUserIdAndId/isLocationExistsByUserIdAndId.query';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ILocationOutboxEvent } from '@/modules/location/domain/interfaces/locationOutboxEvent.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { UpdateLocationRequestDto } from '@/modules/location/interfaces/dtos/updateLocation.request.dto';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class UpdateLocationService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, data: UpdateLocationRequestDto): Promise<IdEntity> {
        {
            const [isExists, existsByName] = await Promise.all([
                this.queryBus.execute<IsLocationExistsByUserIdAndIdQuery, boolean>(
                    new IsLocationExistsByUserIdAndIdQuery({ userId, id: data.id }),
                ),
                this.queryBus.execute<ExistsLocationByUserIdAndExcludingIdAndNameQuery, boolean>(
                    new ExistsLocationByUserIdAndExcludingIdAndNameQuery({
                        userId,
                        excludingId: data.id,
                        name: data.name,
                    }),
                ),
            ]);

            if (!isExists) {
                throw new BadRequestException('Could not found the location');
            }

            if (existsByName) {
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

            await this.commandBus.execute<
                CreateOutboxEventCommand<ILocationOutboxEvent>,
                ISelectOutboxEvent
            >(
                new CreateOutboxEventCommand<ILocationOutboxEvent>({
                    aggregateId: updatedLocation.id,
                    aggregateType: 'locations',
                    eventType: 'updated',
                    payload: updatedLocation,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );

            return IdEntity.create(updatedLocation.id);
        }
    }
}
