import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { DeleteConsumerCommand } from '@/modules/consumer/applications/commands/deleteConsumer/deleteConsumer.command';
import { ConsumerExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumerExistenceValidator.service';
import { ConsumerResource } from '@/modules/consumer/consumer.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

interface IInput {
    userId: string;
    consumerId: string;
}

@Injectable()
export class DeleteConsumerService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly consumerExistenceValidatorService: ConsumerExistenceValidatorService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await this.consumerExistenceValidatorService.validate({
            userId: input.userId,
            id: input.consumerId,
        });

        const deletedConsumer = await this.commandBus.execute<
            DeleteConsumerCommand,
            ISelectConsumer
        >(
            new DeleteConsumerCommand({
                userId: input.userId,
                id: input.consumerId,
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: deletedConsumer.id,
            aggregateType: ConsumerResource.CONSUMER,
            eventType: 'deleted',
            payload: deletedConsumer,
            createdAt: getCurrentUTCTimestamp(),
        });

        return {
            id: deletedConsumer.id,
        };
    }
}
