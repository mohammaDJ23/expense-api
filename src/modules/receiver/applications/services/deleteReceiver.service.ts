import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { IdEntity } from '@/core/entities/id.entity';
import { DeleteReceiverCommand } from '@/modules/receiver/applications/commands/deleteReceiver/deleteReceiver.command';
import { IsReceiverExistsByUserIdAndIdQuery } from '@/modules/receiver/applications/queries/isReceiverExistsByUserIdAndId/isReceiverExistsByUserIdAndId.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class DeleteReceiverService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

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
            return IdEntity.create(deletedReceiver.id);
        }
    }
}
