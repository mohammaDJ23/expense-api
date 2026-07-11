import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { estypes } from '@elastic/elasticsearch';

export interface IElasticsearchDefinition {
    index: TOutboxEventAggregateType;
    settings: estypes.IndicesIndexSettings;
    mappings: estypes.MappingTypeMapping;
    createSearchQuery(userId: string, query: string): estypes.QueryDslQueryContainer;
}
