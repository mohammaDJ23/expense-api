import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';
import { CreateReceiverCommand } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.command';
import { FindReceiverByUserIdAndNameOrNullQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndNameOrNull/findReceiverByUserIdAndNameOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';
import type { IReceiverOutboxEvent } from '@/modules/receiver/domain/interfaces/receiverOutboxEvent.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class CreateReceiverService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, name: string): Promise<IdEntity> {
        const receiver = await this.queryBus.execute<
            FindReceiverByUserIdAndNameOrNullQuery,
            ISelectReceiver | null
        >(new FindReceiverByUserIdAndNameOrNullQuery({ userId, name }));

        if (!receiver) {
            const createdReceiver = await this.commandBus.execute<
                CreateReceiverCommand,
                ISelectReceiver
            >(
                new CreateReceiverCommand({
                    name,
                    userId,
                    createdAt: getCurrentUTCTimestamp(),
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );

            await this.commandBus.execute<
                CreateOutboxEventCommand<IReceiverOutboxEvent>,
                ISelectOutboxEvent
            >(
                new CreateOutboxEventCommand<IReceiverOutboxEvent>({
                    aggregateId: createdReceiver.id,
                    aggregateType: 'receivers',
                    eventType: 'created',
                    payload: createdReceiver,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );

            return IdEntity.create(createdReceiver.id);
        }

        throw new BadRequestException('You already have the receiver');
    }
}
