import type { estypes } from '@elastic/elasticsearch';

export interface IElasticsearchIndex {
    buildIndex(): estypes.IndicesCreateRequest;
}
