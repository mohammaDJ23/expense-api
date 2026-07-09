import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface IReceiverOutboxEvent extends IInsertOutboxEvent<ISelectReceiver> {}
