import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';

export interface IElasticsearchQuery<TInput, TOutput> {
    index: TOutboxEventAggregateType;
    buildQuery(input: TInput): TOutput;
}
