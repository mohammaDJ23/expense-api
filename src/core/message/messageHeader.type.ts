import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { TOutboxEventType } from '@/modules/outbox/domain/types/outboxEventType.type';

export interface IMessageHeader {
    aggregateType: TOutboxEventAggregateType;
    aggregateId: string;
    eventType: TOutboxEventType;
    route: TOutboxEventRoute;
    createdAt: string;
}
