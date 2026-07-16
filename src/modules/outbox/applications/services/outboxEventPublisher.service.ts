import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';

import type { IOutboxEventPublisherService } from '@/modules/outbox/domain/interfaces/outboxEventPublisher.interface';
import type {
    IInsertOutboxEvent,
    ISelectOutboxEvent,
} from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class OutboxEventPublisherService implements IOutboxEventPublisherService {
    constructor(private readonly commandBus: CommandBus) {}

    publish<T extends object = object>(
        input: IInsertOutboxEvent<T>,
    ): Promise<ISelectOutboxEvent<T>> {
        return this.commandBus.execute<CreateOutboxEventCommand, ISelectOutboxEvent<T>>(
            new CreateOutboxEventCommand({
                aggregateId: input.aggregateId,
                aggregateType: input.aggregateType,
                eventType: input.eventType,
                payload: input.payload,
                createdAt: getCurrentUTCTimestamp(),
            }),
        );
    }
}
