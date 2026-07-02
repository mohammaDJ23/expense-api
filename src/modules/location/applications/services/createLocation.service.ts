import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateLocationCommand } from '@/modules/location/applications/commands/createLocation/createLocation.command';
import { FindLocationByUserIdAndNameOrNullQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndNameOrNull/findLocationByUserIdAndNameOrNull.query';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ILocationOutboxEvent } from '@/modules/location/domain/interfaces/locationOutboxEvent.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class CreateLocationService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, name: string): Promise<IdEntity> {
        const location = await this.queryBus.execute<
            FindLocationByUserIdAndNameOrNullQuery,
            ISelectLocation | null
        >(new FindLocationByUserIdAndNameOrNullQuery(userId, name));

        if (!location) {
            const createdLocation = await this.commandBus.execute<
                CreateLocationCommand,
                ISelectLocation
            >(
                new CreateLocationCommand({
                    name,
                    userId,
                    createdAt: getCurrentUTCTimestamp(),
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );

            await this.commandBus.execute<
                CreateOutboxEventCommand<ILocationOutboxEvent>,
                ISelectOutboxEvent
            >(
                new CreateOutboxEventCommand<ILocationOutboxEvent>({
                    aggregateId: createdLocation.id,
                    aggregateType: 'locations',
                    eventType: 'created',
                    payload: createdLocation,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );

            return IdEntity.create(createdLocation.id);
        }

        throw new BadRequestException('You already have the location');
    }
}
