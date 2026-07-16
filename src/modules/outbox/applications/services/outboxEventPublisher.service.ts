import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';

import type { TOutboxEventPayload } from '@/modules/outbox/domain/interfaces/outboxEventPayload.interface';
import type { IOutboxEventPublisherService } from '@/modules/outbox/domain/interfaces/outboxEventPublisher.interface';
import type {
    IInsertOutboxEvent,
    ISelectOutboxEvent,
} from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

type TInput<T> = Omit<IInsertOutboxEvent<T>, 'id' | 'route'>;
type TOutput<T> = ISelectOutboxEvent<T>;

@Injectable()
export class OutboxEventPublisherService implements IOutboxEventPublisherService<
    TInput<TOutboxEventPayload>,
    TOutput<TOutboxEventPayload>
> {
    constructor(private readonly commandBus: CommandBus) {}

    publish<T extends TOutboxEventPayload = TOutboxEventPayload>(
        input: TInput<T>,
    ): Promise<TOutput<T>> {
        return this.commandBus.execute<CreateOutboxEventCommand<T>, ISelectOutboxEvent<T>>(
            new CreateOutboxEventCommand<T>({
                aggregateId: input.aggregateId,
                aggregateType: input.aggregateType,
                eventType: input.eventType,
                payload: input.payload,
                createdAt: getCurrentUTCTimestamp(),
            }),
        );
    }
}
