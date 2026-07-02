import type { TCreate } from '@/core/interfaces/cqrs/createCqrs.interface';
import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

export class CreateOutboxEventCommand<T extends IInsertOutboxEvent = IInsertOutboxEvent> {
    constructor(public readonly props: TCreate<T>) {}
}
