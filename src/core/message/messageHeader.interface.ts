import type { TOutboxEventType } from '@/modules/outbox/domain/interfaces/outboxEventType.interface';

export interface IMessageHeader {
    aggregateType: string;
    aggregateId: string;
    eventType: TOutboxEventType;
    createdAt: string;
}
