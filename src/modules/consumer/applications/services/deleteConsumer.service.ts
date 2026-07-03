import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { DeleteConsumerCommand } from '@/modules/consumer/applications/commands/deleteConsumer/deleteConsumer.command';
import { ExistsConsumerByUserIdAndIdQuery } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndId/existsConsumerByUserIdAndId.query';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IConsumerOutboxEvent } from '@/modules/consumer/domain/interfaces/consumerOutboxEvent.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class DeleteConsumerService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, consumerId: string): Promise<IdEntity> {
        {
            const exists = await this.queryBus.execute<ExistsConsumerByUserIdAndIdQuery, boolean>(
                new ExistsConsumerByUserIdAndIdQuery({
                    userId,
                    id: consumerId,
                }),
            );
            if (!exists) {
                throw new BadRequestException('Could not found the consumer');
            }
        }

        {
            const deletedConsumer = await this.commandBus.execute<
                DeleteConsumerCommand,
                ISelectConsumer
            >(
                new DeleteConsumerCommand({
                    userId,
                    id: consumerId,
                }),
            );

            await this.commandBus.execute<
                CreateOutboxEventCommand<IConsumerOutboxEvent>,
                ISelectOutboxEvent
            >(
                new CreateOutboxEventCommand<IConsumerOutboxEvent>({
                    aggregateId: deletedConsumer.id,
                    aggregateType: 'consumers',
                    eventType: 'deleted',
                    payload: deletedConsumer,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );

            return IdEntity.create(deletedConsumer.id);
        }
    }
}
