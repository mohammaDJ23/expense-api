import type { TOutboxEventPayload } from '@/modules/outbox/domain/types/outboxEventPayload.type';
import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

type TProps<T> = Omit<IInsertOutboxEvent<T>, 'id' | 'route'>;

export class CreateOutboxEventCommand<T = TOutboxEventPayload> {
    constructor(public readonly props: TProps<T>) {}
}
