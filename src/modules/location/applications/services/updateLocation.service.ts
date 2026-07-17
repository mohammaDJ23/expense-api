import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { UpdateLocationCommand } from '@/modules/location/applications/commands/updateLocation/updateLocation.command';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { LocationUniqueNameValidatorService } from '@/modules/location/applications/services/validators/locationUniqueNameValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IServiceHandler } from '@/core/interfaces/service.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { UpdateLocationRequestDto } from '@/modules/location/interfaces/dtos/updateLocation.request.dto';

@Injectable()
export class UpdateLocationService implements IServiceHandler {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
        private readonly locationUniqueNameValidatorService: LocationUniqueNameValidatorService,
    ) {}

    @Transactional()
    async execute(userId: string, data: UpdateLocationRequestDto): Promise<IdEntity> {
        await Promise.all([
            this.locationExistenceValidatorService.validate({ userId, id: data.id }),
            this.locationUniqueNameValidatorService.validate({
                userId,
                excludingId: data.id,
                name: data.name,
            }),
        ]);

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

        await this.outboxEventPublisherService.publish({
            aggregateId: updatedLocation.id,
            aggregateType: 'locations',
            eventType: 'updated',
            payload: updatedLocation,
            createdAt: getCurrentUTCTimestamp(),
        });

        return IdEntity.create(updatedLocation.id);
    }
}
