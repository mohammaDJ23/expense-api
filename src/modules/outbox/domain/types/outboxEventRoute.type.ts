import type { TOutboxEventAggregateType } from './outboxEventAggregateType.type';
import type { TOutboxEventType } from './outboxEventType.type';

export type TOutboxEventRoute = `${TOutboxEventAggregateType}.${TOutboxEventType}`;
