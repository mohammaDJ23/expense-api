import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

type TConsumerEventType = 'created' | 'updated' | 'deleted';

export interface IConsumerOutboxEvent extends Omit<
    IInsertOutboxEvent<ISelectConsumer>,
    'aggregateType' | 'eventType'
> {
    aggregateType: 'consumers';
    eventType: TConsumerEventType;
}
