import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { TOutboxEventType } from '@/modules/outbox/domain/types/outboxEventType.type';

export function createOutboxRoute(
    aggregateType: TOutboxEventAggregateType,
    eventType: TOutboxEventType,
): TOutboxEventRoute {
    return `${aggregateType}.${eventType}`;
}
