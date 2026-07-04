import type { OUTBOX_EVENT_AGGREGATE_TYPES } from '@/modules/outbox/domain/domain.constants';

export type TOutboxEventAggregateType = (typeof OUTBOX_EVENT_AGGREGATE_TYPES)[number];
