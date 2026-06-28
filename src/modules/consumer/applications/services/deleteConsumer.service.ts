import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { IdEntity } from '@/core/entities/id.entity';
import { DeleteConsumerCommand } from '@/modules/consumer/applications/commands/deleteConsumer/deleteConsumer.command';
import { IsConsumerExistsByUserIdAndIdQuery } from '@/modules/consumer/applications/queries/isConsumerExistsByUserIdAndIds/isConsumerExistsByUserIdAndIds.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class DeleteConsumerService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(userId: string, consumerId: string): Promise<IdEntity> {
        {
            const isExists = await this.queryBus.execute<
                IsConsumerExistsByUserIdAndIdQuery,
                boolean
            >(new IsConsumerExistsByUserIdAndIdQuery(userId, consumerId));

            if (!isExists) {
                throw new BadRequestException('Could not found the consumer');
            }
        }

        {
            const deletedConsumer = await this.commandBus.execute<
                DeleteConsumerCommand,
                ISelectConsumer
            >(new DeleteConsumerCommand(userId, consumerId));
            return IdEntity.create(deletedConsumer.id);
        }
    }
}
