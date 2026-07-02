import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { DeleteLocationCommand } from '@/modules/location/applications/commands/deleteLocation/deleteLocation.command';
import { IsLocationExistsByUserIdAndIdQuery } from '@/modules/location/applications/queries/isLocationExistsByUserIdAndId/isLocationExistsByUserIdAndId.query';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ILocationOutboxEvent } from '@/modules/location/domain/interfaces/locationOutboxEvent.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class DeleteLocationService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, locationId: string): Promise<IdEntity> {
        {
            const isExists = await this.queryBus.execute<
                IsLocationExistsByUserIdAndIdQuery,
                boolean
            >(new IsLocationExistsByUserIdAndIdQuery({ userId, id: locationId }));

            if (!isExists) {
                throw new BadRequestException('Could not found the location');
            }
        }

        {
            const deletedLocation = await this.commandBus.execute<
                DeleteLocationCommand,
                ISelectLocation
            >(new DeleteLocationCommand({ userId, id: locationId }));

            await this.commandBus.execute<
                CreateOutboxEventCommand<ILocationOutboxEvent>,
                ISelectOutboxEvent
            >(
                new CreateOutboxEventCommand<ILocationOutboxEvent>({
                    aggregateId: deletedLocation.id,
                    aggregateType: 'locations',
                    eventType: 'deleted',
                    payload: deletedLocation,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );

            return IdEntity.create(deletedLocation.id);
        }
    }
}
