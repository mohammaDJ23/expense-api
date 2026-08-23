import { Injectable } from '@nestjs/common';

import { ElasticsearchAnalysisSettings } from '@/infrastructure/elasticsearch/elasticsearchAnalysis.settings';
import { ReceiverResource } from '@/modules/receiver/receiver.enum';

import type { IElasticsearchIndex } from '@/infrastructure/elasticsearch/elasticsearchIndex.interface';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class ReceiverElasticsearchIndex implements IElasticsearchIndex {
    buildIndex(): estypes.IndicesCreateRequest {
        return {
            index: ReceiverResource.RECEIVER,
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
