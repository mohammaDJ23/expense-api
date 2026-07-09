import type { TOutboxEventAggregateType } from './outboxEventAggregateType.interface';
import type { TOutboxEventType } from './outboxEventType.interface';

export type TOutboxEventRoute = `${TOutboxEventAggregateType}.${TOutboxEventType}`;
