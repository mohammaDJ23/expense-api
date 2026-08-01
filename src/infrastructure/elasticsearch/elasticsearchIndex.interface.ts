import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

export interface IElasticsearchIndex {
    index: TOutboxEventAggregateType;
    buildIndex(): estypes.IndicesCreateRequest;
}
