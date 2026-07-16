import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { DeleteLocationCommand } from '@/modules/location/applications/commands/deleteLocation/deleteLocation.command';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class DeleteLocationService implements IServiceHandler {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
    ) {}

    @Transactional()
    async execute(userId: string, locationId: string): Promise<IdEntity> {
        await this.locationExistenceValidatorService.validate({ userId, id: locationId });

        const deletedLocation = await this.commandBus.execute<
            DeleteLocationCommand,
            ISelectLocation
        >(
            new DeleteLocationCommand({
                userId,
                id: locationId,
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: deletedLocation.id,
            aggregateType: 'locations',
            eventType: 'deleted',
            payload: deletedLocation,
            createdAt: getCurrentUTCTimestamp(),
        });

        return IdEntity.create(deletedLocation.id);
    }
}
