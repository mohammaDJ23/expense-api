import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateLocationCommand } from '@/modules/location/applications/commands/createLocation/createLocation.command';
import { FindLocationByUserIdAndNameOrNullQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndNameOrNull/findLocationByUserIdAndNameOrNull.query';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class CreateLocationService implements IService<IInput, IdEntity> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IdEntity> {
        const location = await this.queryBus.execute<
            FindLocationByUserIdAndNameOrNullQuery,
            ISelectLocation | null
        >(
            new FindLocationByUserIdAndNameOrNullQuery({
                userId: input.userId,
                name: input.name,
            }),
        );

        if (!location) {
            const createdLocation = await this.commandBus.execute<
                CreateLocationCommand,
                ISelectLocation
            >(
                new CreateLocationCommand({
                    name: input.name,
                    userId: input.userId,
                    createdAt: getCurrentUTCTimestamp(),
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );

            await this.outboxEventPublisherService.publish({
                aggregateId: createdLocation.id,
                aggregateType: 'locations',
                eventType: 'created',
                payload: createdLocation,
                createdAt: getCurrentUTCTimestamp(),
            });

            return IdEntity.create(createdLocation.id);
        }

        throw new BadRequestException('You already have the location');
    }
}
