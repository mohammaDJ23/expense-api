import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';
import { DeleteReceiverCommand } from '@/modules/receiver/applications/commands/deleteReceiver/deleteReceiver.command';
import { IsReceiverExistsByUserIdAndIdQuery } from '@/modules/receiver/applications/queries/isReceiverExistsByUserIdAndId/isReceiverExistsByUserIdAndId.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';
import type { IReceiverOutboxEvent } from '@/modules/receiver/domain/interfaces/receiverOutboxEvent.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class DeleteReceiverService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, receiverId: string): Promise<IdEntity> {
        {
            const isExists = await this.queryBus.execute<
                IsReceiverExistsByUserIdAndIdQuery,
                boolean
            >(new IsReceiverExistsByUserIdAndIdQuery(userId, receiverId));

            if (!isExists) {
                throw new BadRequestException('Could not found the receiver');
            }
        }

        {
            const deletedReceiver = await this.commandBus.execute<
                DeleteReceiverCommand,
                ISelectReceiver
            >(new DeleteReceiverCommand(userId, receiverId));

            await this.commandBus.execute<
                CreateOutboxEventCommand<IReceiverOutboxEvent>,
                ISelectOutboxEvent
            >(
                new CreateOutboxEventCommand<IReceiverOutboxEvent>({
                    aggregateId: deletedReceiver.id,
                    aggregateType: 'receivers',
                    eventType: 'deleted',
                    payload: deletedReceiver,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );

            return IdEntity.create(deletedReceiver.id);
        }
    }
}
