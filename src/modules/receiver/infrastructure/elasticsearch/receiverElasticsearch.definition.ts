import { Injectable } from '@nestjs/common';

import { ElasticsearchAnalysisSettings } from '@/infrastructure/elasticsearch/elasticsearchAnalysis.settings';

import type { IElasticsearchDefinition } from '@/infrastructure/elasticsearch/elasticsearchDefinition.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class ReceiverElasticsearchDefinition implements IElasticsearchDefinition {
    index: TOutboxEventAggregateType = 'receivers';

    buildIndex(): estypes.IndicesCreateRequest {
        return {
            index: this.index,
            settings: ElasticsearchAnalysisSettings.settings,
            mappings: {
                properties: {
                    userId: {
                        type: 'keyword',
                    },
                    name: {
                        type: 'text',
                        fields: {
                            partial: {
                                type: 'text',
                                analyzer: 'partial_index',
                                search_analyzer: 'partial_search',
                            },
                        },
                    },
                },
            },
        };
    }

    buildSearch(userId: string, query: string, size: number): estypes.SearchRequest {
        return {
            size,
            index: this.index,
            query: {
                bool: {
                    filter: [
                        {
                            term: {
                                userId,
                            },
                        },
                    ],
                    must: [
                        {
                            bool: {
                                minimum_should_match: 1,
                                should: [
                                    {
                                        match: {
                                            name: {
                                                query,
                                                fuzziness: 'AUTO',
                                                boost: 5,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'name.partial': {
                                                query,
                                                boost: 3,
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        };
    }
}
