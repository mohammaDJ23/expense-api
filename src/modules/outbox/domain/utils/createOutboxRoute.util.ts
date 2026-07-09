import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/interfaces/outboxEventRoute.interface';
import type { TOutboxEventType } from '@/modules/outbox/domain/interfaces/outboxEventType.interface';

export function createOutboxRoute(
    aggregateType: TOutboxEventAggregateType,
    eventType: TOutboxEventType,
): TOutboxEventRoute {
    return `${aggregateType}.${eventType}`;
}
