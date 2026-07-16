import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateConsumerCommand } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.command';
import { FindConsumerByUserIdAndNameOrNullQuery } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndNameOrNull/findConsumerByUserIdAndNameOrNull.query';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class CreateConsumerService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(userId: string, name: string): Promise<IdEntity> {
        const consumer = await this.queryBus.execute<
            FindConsumerByUserIdAndNameOrNullQuery,
            ISelectConsumer | null
        >(new FindConsumerByUserIdAndNameOrNullQuery({ userId, name }));

        if (!consumer) {
            const createdConsumer = await this.commandBus.execute<
                CreateConsumerCommand,
                ISelectConsumer
            >(
                new CreateConsumerCommand({
                    name,
                    userId,
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

            return IdEntity.create(createdConsumer.id);
        }

        throw new BadRequestException('You already have the consumer');
    }
}
