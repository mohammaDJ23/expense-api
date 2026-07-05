import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { EachBatchPayload } from 'kafkajs';

export interface IMessageHandler {
    readonly aggregateType: TOutboxEventAggregateType;

    execute(batch: EachBatchPayload): Promise<void>;
}
