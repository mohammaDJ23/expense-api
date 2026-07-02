import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { UpdateConsumerCommand } from '@/modules/consumer/applications/commands/updateConsumer/updateConsumer.command';
import { FindConsumerByUserIdAndNameOrNullQuery } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndNameOrNull/findConsumerByUserIdAndNameOrNull.query';
import { IsConsumerExistsByUserIdAndIdQuery } from '@/modules/consumer/applications/queries/isConsumerExistsByUserIdAndId/isConsumerExistsByUserIdAndId.query';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IConsumerOutboxEvent } from '@/modules/consumer/domain/interfaces/consumerOutboxEvent.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { UpdateConsumerRequestDto } from '@/modules/consumer/interfaces/dtos/updateConsumer.request.dto';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class UpdateConsumerService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, data: UpdateConsumerRequestDto): Promise<IdEntity> {
        {
            const [isExists, foundedByName] = await Promise.all([
                this.queryBus.execute<IsConsumerExistsByUserIdAndIdQuery, boolean>(
                    new IsConsumerExistsByUserIdAndIdQuery(userId, data.id),
                ),
                this.queryBus.execute<
                    FindConsumerByUserIdAndNameOrNullQuery,
                    ISelectConsumer | null
                >(new FindConsumerByUserIdAndNameOrNullQuery(userId, data.name)),
            ]);

            if (!isExists) {
                throw new BadRequestException('Could not found the consumer');
            }

            if (foundedByName) {
                throw new BadRequestException('The consumer already exists');
            }
        }

        {
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

            await this.commandBus.execute<
                CreateOutboxEventCommand<IConsumerOutboxEvent>,
                ISelectOutboxEvent
            >(
                new CreateOutboxEventCommand<IConsumerOutboxEvent>({
                    aggregateId: updatedConsumer.id,
                    aggregateType: 'consumers',
                    eventType: 'updated',
                    payload: updatedConsumer,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );

            return IdEntity.create(updatedConsumer.id);
        }
    }
}
