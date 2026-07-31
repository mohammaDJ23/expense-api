import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/interfaces/outboxEventRoute.interface';
import type { TOutboxEventType } from '@/modules/outbox/domain/interfaces/outboxEventType.interface';

export interface IMessageHeader {
    aggregateType: TOutboxEventAggregateType;
    aggregateId: string;
    eventType: TOutboxEventType;
    route: TOutboxEventRoute;
    createdAt: string;
}
