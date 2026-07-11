import { Injectable } from '@nestjs/common';

import { ElasticsearchAnalysisSettings } from '@/infrastructure/elasticsearch/elasticsearchAnalysis.settings';

import type { IElasticsearchDefinition } from '@/infrastructure/elasticsearch/elasticsearchDefinition.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class BillElasticsearchDefinition implements IElasticsearchDefinition {
    index: TOutboxEventAggregateType = 'bills';

    settings: estypes.IndicesIndexSettings = ElasticsearchAnalysisSettings.settings;

    mappings: estypes.MappingTypeMapping = {
        properties: {
            userId: {
                type: 'keyword',
            },
            amount: {
                type: 'text',
                fields: {
                    partial: {
                        type: 'text',
                        analyzer: 'partial_index',
                        search_analyzer: 'partial_search',
                    },
                },
            },
            description: {
                type: 'text',
                fields: {
                    partial: {
                        type: 'text',
                        analyzer: 'partial_index',
                        search_analyzer: 'partial_search',
                    },
                },
            },
            receiver: {
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
            },
            location: {
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
            },
            consumers: {
                type: 'nested',
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
            },
        },
    };

    createSearchQuery(userId: string, query: string): estypes.QueryDslQueryContainer {
        return {
            bool: {
                filter: [
                    {
                        term: {
                            userId,
                        },
                    },
                ],
                should: [
                    {
                        match: {
                            amount: {
                                query,
                                boost: 5,
                            },
                        },
                    },
                    {
                        match: {
                            description: {
                                query,
                                fuzziness: 'AUTO',
                                boost: 5,
                            },
                        },
                    },
                    {
                        match: {
                            'amount.partial': {
                                query,
                                boost: 3,
                            },
                        },
                    },
                    {
                        match: {
                            'description.partial': {
                                query,
                                boost: 3,
                            },
                        },
                    },
                    {
                        match: {
                            'receiver.name': {
                                query,
                                fuzziness: 'AUTO',
                                boost: 4,
                            },
                        },
                    },
                    {
                        match: {
                            'receiver.name.partial': {
                                query,
                                boost: 2,
                            },
                        },
                    },
                    {
                        match: {
                            'location.name': {
                                query,
                                fuzziness: 'AUTO',
                                boost: 4,
                            },
                        },
                    },
                    {
                        match: {
                            'location.name.partial': {
                                query,
                                boost: 2,
                            },
                        },
                    },
                    {
                        nested: {
                            path: 'consumers',
                            query: {
                                bool: {
                                    should: [
                                        {
                                            match: {
                                                'consumers.name': {
                                                    query,
                                                    fuzziness: 'AUTO',
                                                    boost: 4,
                                                },
                                            },
                                        },
                                        {
                                            match: {
                                                'consumers.name.partial': {
                                                    query,
                                                    boost: 2,
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
                minimum_should_match: 1,
            },
        };
    }
}
