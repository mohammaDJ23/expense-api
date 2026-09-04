import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateLocationCommand } from '@/modules/location/applications/commands/updateLocation/updateLocation.command';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { LocationUniqueNameValidatorService } from '@/modules/location/applications/services/validators/locationUniqueNameValidator.service';
import { LocationResource } from '@/modules/location/domain/enums/location.enum';
import { LocationMessageEvent } from '@/modules/location/domain/enums/locationMessageEvent.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { UpdateLocationRequestDto } from '@/modules/location/interfaces/dtos/updateLocation.request.dto';

interface IInput {
    userId: string;
    body: UpdateLocationRequestDto;
}

@Injectable()
export class UpdateLocationService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
        private readonly locationUniqueNameValidatorService: LocationUniqueNameValidatorService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await Promise.all([
            this.locationExistenceValidatorService.validate({
                userId: input.userId,
                id: input.body.id,
            }),
            this.locationUniqueNameValidatorService.validate({
                userId: input.userId,
                excludingId: input.body.id,
                name: input.body.name,
            }),
        ]);

        const creationTime = getCurrentUTCTimestamp();

        const updatedLocation = await this.commandBus.execute<
            UpdateLocationCommand,
            ISelectLocation
        >(
            new UpdateLocationCommand({
                id: input.body.id,
                name: input.body.name,
                userId: input.userId,
                updatedAt: creationTime,
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: updatedLocation.id,
            aggregateType: LocationResource.LOCATION,
            eventType: LocationMessageEvent.UPDATED_LOCATION,
            payload: updatedLocation,
            createdAt: creationTime,
        });

        return {
            id: updatedLocation.id,
        };
    }
}
