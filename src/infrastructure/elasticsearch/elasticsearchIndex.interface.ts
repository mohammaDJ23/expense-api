import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { estypes } from '@elastic/elasticsearch';

export interface IElasticsearchIndex {
    index: TOutboxEventAggregateType;
    buildIndex(): estypes.IndicesCreateRequest;
}
