import { Injectable } from '@nestjs/common';

import { ElasticsearchAnalysisSettings } from '@/infrastructure/elasticsearch/elasticsearchAnalysis.settings';
import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';

import type { IElasticsearchIndex } from '@/infrastructure/elasticsearch/elasticsearchIndex.interface';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class ConsumerElasticsearchIndex implements IElasticsearchIndex {
    buildIndex(): estypes.IndicesCreateRequest {
        return {
            index: ConsumerResource.CONSUMER,
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
}
