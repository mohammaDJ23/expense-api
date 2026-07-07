import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { Batch } from 'kafkajs';

export interface IMessageHandler {
    readonly aggregateType: TOutboxEventAggregateType;

    execute(batch: Batch): Promise<void> | void;
}
