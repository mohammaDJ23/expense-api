import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

export interface IElasticsearchQuery<TInput> {
    index: TOutboxEventAggregateType;
    buildQuery(input: TInput): estypes.SearchRequest;
}
