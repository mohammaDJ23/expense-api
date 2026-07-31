import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateLocationCommand } from '@/modules/location/applications/commands/createLocation/createLocation.command';
import { LocationNameAvailableValidatorService } from '@/modules/location/applications/services/validators/locationNameAvailableValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class CreateLocationService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly locationNameAvailableValidatorService: LocationNameAvailableValidatorService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await this.locationNameAvailableValidatorService.validate({
            userId: input.userId,
            name: input.name,
        });

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

        return {
            id: createdLocation.id,
        };
    }
}
