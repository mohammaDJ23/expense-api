import { Injectable } from '@nestjs/common';

import { ElasticsearchAnalysisSettings } from '@/infrastructure/elasticsearch/elasticsearchAnalysis.settings';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

import type { IElasticsearchIndex } from '@/infrastructure/elasticsearch/elasticsearchIndex.interface';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class BillElasticsearchIndex implements IElasticsearchIndex {
    buildIndex(): estypes.IndicesCreateRequest {
        return {
            index: BillResource.BILL,
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
}
