import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

export interface IConsumerOutboxEvent extends IInsertOutboxEvent<ISelectConsumer> {}
