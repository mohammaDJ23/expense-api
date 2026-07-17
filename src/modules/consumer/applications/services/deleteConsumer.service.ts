import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { DeleteConsumerCommand } from '@/modules/consumer/applications/commands/deleteConsumer/deleteConsumer.command';
import { ConsumerExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumerExistenceValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IServiceHandler } from '@/core/interfaces/service.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class DeleteConsumerService implements IServiceHandler {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly consumerExistenceValidatorService: ConsumerExistenceValidatorService,
    ) {}

    @Transactional()
    async execute(userId: string, consumerId: string): Promise<IdEntity> {
        await this.consumerExistenceValidatorService.validate({ userId, id: consumerId });

        const deletedConsumer = await this.commandBus.execute<
            DeleteConsumerCommand,
            ISelectConsumer
        >(
            new DeleteConsumerCommand({
                userId,
                id: consumerId,
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: deletedConsumer.id,
            aggregateType: 'consumers',
            eventType: 'deleted',
            payload: deletedConsumer,
            createdAt: getCurrentUTCTimestamp(),
        });

        return IdEntity.create(deletedConsumer.id);
    }
}
