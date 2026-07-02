import type { TCreate } from '@/core/interfaces/cqrs/createCqrs.interface';
import type { TOutboxEventPayload } from '@/modules/outbox/domain/interfaces/outboxEventPayload.interface';
import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

export class CreateOutboxEventCommand<T extends TOutboxEventPayload = TOutboxEventPayload> {
    constructor(public readonly props: TCreate<IInsertOutboxEvent<T>>) {}
}
