import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { CreateReceiverCommand } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.command';
import { FindReceiverByUserIdAndNameOrNullQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndNameOrNull/findReceiverByUserIdAndNameOrNull.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class CreateReceiverService implements IService<IInput, IdEntity> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IdEntity> {
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

            return IdEntity.create(createdReceiver.id);
        }

        throw new BadRequestException('You already have the receiver');
    }
}
