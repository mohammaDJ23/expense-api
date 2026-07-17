import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { UpdateConsumerCommand } from '@/modules/consumer/applications/commands/updateConsumer/updateConsumer.command';
import { ConsumerExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumerExistenceValidator.service';
import { ConsumerUniqueNameValidatorService } from '@/modules/consumer/applications/services/validators/consumerUniqueNameValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { UpdateConsumerRequestDto } from '@/modules/consumer/interfaces/dtos/updateConsumer.request.dto';

@Injectable()
export class UpdateConsumerService implements IServiceHandler {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly consumerExistenceValidatorService: ConsumerExistenceValidatorService,
        private readonly ConsumerUniqueNameValidatorService: ConsumerUniqueNameValidatorService,
    ) {}

    @Transactional()
    async execute(userId: string, data: UpdateConsumerRequestDto): Promise<IdEntity> {
        await Promise.all([
            this.consumerExistenceValidatorService.validate({ userId, id: data.id }),
            this.ConsumerUniqueNameValidatorService.validate({
                userId,
                excludingId: data.id,
                name: data.name,
            }),
        ]);

        const updatedConsumer = await this.commandBus.execute<
            UpdateConsumerCommand,
            ISelectConsumer
        >(
            new UpdateConsumerCommand({
                id: data.id,
                name: data.name,
                userId,
                updatedAt: getCurrentUTCTimestamp(),
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: updatedConsumer.id,
            aggregateType: 'consumers',
            eventType: 'updated',
            payload: updatedConsumer,
            createdAt: getCurrentUTCTimestamp(),
        });

        return IdEntity.create(updatedConsumer.id);
    }
}
