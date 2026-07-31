import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { UpdateReceiverCommand } from '@/modules/receiver/applications/commands/updateReceiver/updateReceiver.command';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';
import { ReceiverUniqueNameValidatorService } from '@/modules/receiver/applications/services/validators/receiverUniqueNameValidator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { UpdateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/updateReceiver.request.dto';

interface IInput {
    userId: string;
    body: UpdateReceiverRequestDto;
}

@Injectable()
export class UpdateReceiverService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly receiverExistenceValidatorService: ReceiverExistenceValidatorService,
        private readonly receiverUniqueNameValidatorService: ReceiverUniqueNameValidatorService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await Promise.all([
            this.receiverExistenceValidatorService.validate({
                userId: input.userId,
                id: input.body.id,
            }),
            this.receiverUniqueNameValidatorService.validate({
                userId: input.userId,
                excludingId: input.body.id,
                name: input.body.name,
            }),
        ]);

        const updatedReceiver = await this.commandBus.execute<
            UpdateReceiverCommand,
            ISelectReceiver
        >(
            new UpdateReceiverCommand({
                id: input.body.id,
                name: input.body.name,
                userId: input.userId,
                updatedAt: getCurrentUTCTimestamp(),
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: updatedReceiver.id,
            aggregateType: 'receivers',
            eventType: 'updated',
            payload: updatedReceiver,
            createdAt: getCurrentUTCTimestamp(),
        });

        return {
            id: updatedReceiver.id,
        };
    }
}
