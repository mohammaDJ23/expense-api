import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { DeleteLocationCommand } from '@/modules/location/applications/commands/deleteLocation/deleteLocation.command';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IInput {
    userId: string;
    locationId: string;
}

@Injectable()
export class DeleteLocationService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await this.locationExistenceValidatorService.validate({
            userId: input.userId,
            id: input.locationId,
        });

        const deletedLocation = await this.commandBus.execute<
            DeleteLocationCommand,
            ISelectLocation
        >(
            new DeleteLocationCommand({
                userId: input.userId,
                id: input.locationId,
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: deletedLocation.id,
            aggregateType: 'locations',
            eventType: 'deleted',
            payload: deletedLocation,
            createdAt: getCurrentUTCTimestamp(),
        });

        return {
            id: deletedLocation.id,
        };
    }
}
