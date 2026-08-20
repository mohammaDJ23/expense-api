import { Injectable } from '@nestjs/common';

import { ElasticsearchAnalysisSettings } from '@/infrastructure/elasticsearch/elasticsearchAnalysis.settings';
import { BillResource } from '@/modules/bill/bill.enum';

import type { IElasticsearchIndex } from '@/infrastructure/elasticsearch/elasticsearchIndex.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class BillElasticsearchIndex implements IElasticsearchIndex {
    index: TOutboxEventAggregateType = BillResource.BILL;

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
}
