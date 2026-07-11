import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { estypes } from '@elastic/elasticsearch';

export interface IElasticsearchDefinition {
    index: TOutboxEventAggregateType;
    buildIndex(): estypes.IndicesCreateRequest;
    buildSearch(userId: string, query: string, size: number): estypes.SearchRequest;
}
