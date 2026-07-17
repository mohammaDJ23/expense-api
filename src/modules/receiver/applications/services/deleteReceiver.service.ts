import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { DeleteReceiverCommand } from '@/modules/receiver/applications/commands/deleteReceiver/deleteReceiver.command';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';

import type { IId } from '@/core/interfaces/id.interface';
import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IInput {
    userId: string;
    receiverId: string;
}

@Injectable()
export class DeleteReceiverService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly receiverExistenceValidatorService: ReceiverExistenceValidatorService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await this.receiverExistenceValidatorService.validate({
            userId: input.userId,
            id: input.receiverId,
        });

        const deletedReceiver = await this.commandBus.execute<
            DeleteReceiverCommand,
            ISelectReceiver
        >(
            new DeleteReceiverCommand({
                userId: input.userId,
                id: input.receiverId,
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: deletedReceiver.id,
            aggregateType: 'receivers',
            eventType: 'deleted',
            payload: deletedReceiver,
            createdAt: getCurrentUTCTimestamp(),
        });

        return {
            id: deletedReceiver.id,
        };
    }
}
