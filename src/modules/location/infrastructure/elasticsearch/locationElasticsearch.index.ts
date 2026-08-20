import { Injectable } from '@nestjs/common';

import { ElasticsearchAnalysisSettings } from '@/infrastructure/elasticsearch/elasticsearchAnalysis.settings';
import { LocationResource } from '@/modules/location/location.enum';

import type { IElasticsearchIndex } from '@/infrastructure/elasticsearch/elasticsearchIndex.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class LocationElasticsearchIndex implements IElasticsearchIndex {
    index: TOutboxEventAggregateType = LocationResource.LOCATION;

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
}
