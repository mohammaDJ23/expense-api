import { Injectable } from '@nestjs/common';

import { ElasticsearchAnalysisSettings } from '@/infrastructure/elasticsearch/elasticsearchAnalysis.settings';

import type { IElasticsearchDefinition } from '@/infrastructure/elasticsearch/elasticsearchDefinition.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class BillElasticsearchDefinition implements IElasticsearchDefinition {
    index: TOutboxEventAggregateType = 'bills';

    buildIndex(): estypes.IndicesCreateRequest {
        return {
            index: this.index,
            settings: ElasticsearchAnalysisSettings.settings,
            mappings: {
                properties: {
                    userId: {
                        type: 'keyword',
                    },
                    amount: {
                        type: 'keyword',
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
                        type: 'object',
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
                        type: 'object',
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
                                        term: {
                                            amount: {
                                                value: query,
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
                                                    minimum_should_match: 1,
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
                            },
                        },
                    ],
                },
            },
        };
    }
}
