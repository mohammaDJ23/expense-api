import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { EachBatchPayload } from 'kafkajs';

export interface IKafkaHandler {
    readonly aggregateType: TOutboxEventAggregateType;

    handle(batch: EachBatchPayload): Promise<void>;
}
