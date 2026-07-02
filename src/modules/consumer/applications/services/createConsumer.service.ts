import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateConsumerCommand } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.command';
import { FindConsumerByUserIdAndNameOrNullQuery } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndNameOrNull/findConsumerByUserIdAndNameOrNull.query';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IConsumerOutboxEvent } from '@/modules/consumer/domain/interfaces/consumerOutboxEvent.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class CreateConsumerService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, name: string): Promise<IdEntity> {
        const consumer = await this.queryBus.execute<
            FindConsumerByUserIdAndNameOrNullQuery,
            ISelectConsumer | null
        >(new FindConsumerByUserIdAndNameOrNullQuery(userId, name));

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

            await this.commandBus.execute<
                CreateOutboxEventCommand<IConsumerOutboxEvent>,
                ISelectOutboxEvent
            >(
                new CreateOutboxEventCommand<IConsumerOutboxEvent>({
                    aggregateId: createdConsumer.id,
                    aggregateType: 'consumers',
                    eventType: 'created',
                    payload: createdConsumer,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );

            return IdEntity.create(createdConsumer.id);
        }

        throw new BadRequestException('You already have the consumer');
    }
}
