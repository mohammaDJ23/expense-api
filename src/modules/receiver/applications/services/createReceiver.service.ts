import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateReceiverCommand } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.command';
import { FindReceiverByUserIdAndNameOrNullQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndNameOrNull/findReceiverByUserIdAndNameOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class CreateReceiverService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(userId: string, name: string): Promise<IdEntity> {
        const receiver = await this.queryBus.execute<
            FindReceiverByUserIdAndNameOrNullQuery,
            ISelectReceiver | null
        >(new FindReceiverByUserIdAndNameOrNullQuery(userId, name));

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
            return IdEntity.create(createdReceiver.id);
        }

        throw new BadRequestException('You already have the receiver');
    }
}
