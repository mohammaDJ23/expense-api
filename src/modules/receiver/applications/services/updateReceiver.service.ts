import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { UpdateReceiverCommand } from '@/modules/receiver/applications/commands/updateReceiver/updateReceiver.command';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';
import { ReceiverUniqueNameValidatorService } from '@/modules/receiver/applications/services/validators/receiverUniqueNameValidator.service';

import type { IServiceHandler } from '@/core/interfaces/service.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { UpdateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/updateReceiver.request.dto';

@Injectable()
export class UpdateReceiverService implements IServiceHandler {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly receiverExistenceValidatorService: ReceiverExistenceValidatorService,
        private readonly receiverUniqueNameValidatorService: ReceiverUniqueNameValidatorService,
    ) {}

    @Transactional()
    async execute(userId: string, data: UpdateReceiverRequestDto): Promise<IdEntity> {
        await Promise.all([
            this.receiverExistenceValidatorService.validate({ userId, id: data.id }),
            this.receiverUniqueNameValidatorService.validate({
                userId,
                excludingId: data.id,
                name: data.name,
            }),
        ]);

        const updatedReceiver = await this.commandBus.execute<
            UpdateReceiverCommand,
            ISelectReceiver
        >(
            new UpdateReceiverCommand({
                id: data.id,
                name: data.name,
                userId,
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

        return IdEntity.create(updatedReceiver.id);
    }
}
