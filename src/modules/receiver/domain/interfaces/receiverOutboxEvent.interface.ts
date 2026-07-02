import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

type TReceiverEventType = 'created' | 'updated' | 'deleted';

export interface IReceiverOutboxEvent extends Omit<
    IInsertOutboxEvent<ISelectReceiver>,
    'aggregateType' | 'eventType'
> {
    aggregateType: 'receivers';
    eventType: TReceiverEventType;
}
