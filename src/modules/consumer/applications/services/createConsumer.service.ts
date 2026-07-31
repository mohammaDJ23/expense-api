import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { CreateConsumerCommand } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.command';
import { ConsumerNameAvailableValidatorService } from '@/modules/consumer/applications/services/validators/consumerNameAvailableValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class CreateConsumerService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly consumerNameAvailableValidatorService: ConsumerNameAvailableValidatorService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await this.consumerNameAvailableValidatorService.validate({
            userId: input.userId,
            name: input.name,
        });

        const createdConsumer = await this.commandBus.execute<
            CreateConsumerCommand,
            ISelectConsumer
        >(
            new CreateConsumerCommand({
                name: input.name,
                userId: input.userId,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: createdConsumer.id,
            aggregateType: 'consumers',
            eventType: 'created',
            payload: createdConsumer,
            createdAt: getCurrentUTCTimestamp(),
        });

        return {
            id: createdConsumer.id,
        };
    }
}
