import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateConsumerCommand } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.command';
import { ConsumerNameAvailableValidatorService } from '@/modules/consumer/applications/services/validators/consumerNameAvailableValidator.service';
import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';
import { ConsumerMessageEvent } from '@/modules/consumer/domain/enums/consumerMessageEvent.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
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

        const creationTime = getCurrentUTCTimestamp();

        const createdConsumer = await this.commandBus.execute<
            CreateConsumerCommand,
            ISelectConsumer
        >(
            new CreateConsumerCommand({
                name: input.name,
                userId: input.userId,
                createdAt: creationTime,
                updatedAt: creationTime,
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: createdConsumer.id,
            aggregateType: ConsumerResource.CONSUMER,
            eventType: ConsumerMessageEvent.CREATED_CONSUMER,
            payload: createdConsumer,
            createdAt: creationTime,
        });

        return {
            id: createdConsumer.id,
        };
    }
}
