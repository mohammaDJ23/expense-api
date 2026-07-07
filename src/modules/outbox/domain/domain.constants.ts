import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';

export const OUTBOX_EVENT_AGGREGATE_TYPES: TOutboxEventAggregateType[] = [
    'bills',
    'consumers',
    'locations',
    'receivers',
];
