import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

export class CreateOutboxEventCommand<T extends IInsertOutboxEvent = IInsertOutboxEvent> {
    constructor(public readonly props: Omit<T, 'id'>) {}
}
