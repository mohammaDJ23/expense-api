import { ConflictException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { CreateReceiverCommand } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.command';
import { FindReceiverByUserIdAndNameOrNullQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndNameOrNull/findReceiverByUserIdAndNameOrNull.query';

import type { IId } from '@/core/interfaces/id.interface';
import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class CreateReceiverService implements IService<IInput, IId> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        const receiver = await this.queryBus.execute<
            FindReceiverByUserIdAndNameOrNullQuery,
            ISelectReceiver | null
        >(
            new FindReceiverByUserIdAndNameOrNullQuery({
                userId: input.userId,
                name: input.name,
            }),
        );

        if (!receiver) {
            const createdReceiver = await this.commandBus.execute<
                CreateReceiverCommand,
                ISelectReceiver
            >(
                new CreateReceiverCommand({
                    name: input.name,
                    userId: input.userId,
                    createdAt: getCurrentUTCTimestamp(),
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );

            await this.outboxEventPublisherService.publish({
                aggregateId: createdReceiver.id,
                aggregateType: 'receivers',
                eventType: 'created',
                payload: createdReceiver,
                createdAt: getCurrentUTCTimestamp(),
            });

            return {
                id: createdReceiver.id,
            };
        }

        throw new ConflictException('You already have the receiver');
    }
}
