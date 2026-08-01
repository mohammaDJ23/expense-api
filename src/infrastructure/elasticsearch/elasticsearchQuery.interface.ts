import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

export interface IElasticsearchQuery {
    index: TOutboxEventAggregateType;
    buildQuery(userId: string, query: string, size: number): estypes.SearchRequest;
}
