import { Injectable } from '@nestjs/common';

import { ElasticsearchAnalysisSettings } from '@/infrastructure/elasticsearch/elasticsearchAnalysis.settings';

import type { IElasticsearchDefinition } from '@/infrastructure/elasticsearch/elasticsearchDefinition.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class ConsumerElasticsearchDefinition implements IElasticsearchDefinition {
    index: TOutboxEventAggregateType = 'consumers';

    settings: estypes.IndicesIndexSettings = ElasticsearchAnalysisSettings.settings;

    mappings: estypes.MappingTypeMapping = {
        properties: {
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
    };

    createSearchQuery(query: string): estypes.QueryDslQueryContainer {
        return {
            bool: {
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
                minimum_should_match: 1,
            },
        };
    }
}
