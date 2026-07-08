import type { IMessageBatch } from './messageBatch.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';

export interface IMessageHandler<T> {
    readonly aggregateType: TOutboxEventAggregateType;

    execute(batch: IMessageBatch<T>[]): Promise<void> | void;
}
