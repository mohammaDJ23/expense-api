import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { CreateReceiverCommand } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.command';
import { ReceiverNameAvailableValidatorService } from '@/modules/receiver/applications/services/validators/receiverNameAvailableValidator.service';
import { ReceiverResource } from '@/modules/receiver/receiver.enum';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class CreateReceiverService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly receiverNameAvailableValidatorService: ReceiverNameAvailableValidatorService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await this.receiverNameAvailableValidatorService.validate({
            userId: input.userId,
            name: input.name,
        });

        const createdReceiver = await this.commandBus.execute<
            CreateReceiverCommand,
            ISelectReceiver
        >(
            new CreateReceiverCommand({
                name: input.name,
                userId: input.userId,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: createdReceiver.id,
            aggregateType: ReceiverResource.RECEIVER,
            eventType: 'created',
            payload: createdReceiver,
            createdAt: getCurrentUTCTimestamp(),
        });

        return {
            id: createdReceiver.id,
        };
    }
}
