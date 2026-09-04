import { Injectable } from '@nestjs/common';

import { ElasticsearchAnalysisSettings } from '@/infrastructure/elasticsearch/elasticsearchAnalysis.settings';
import { LocationResource } from '@/modules/location/domain/enums/location.enum';

import type { IElasticsearchIndex } from '@/infrastructure/elasticsearch/elasticsearchIndex.interface';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class LocationElasticsearchIndex implements IElasticsearchIndex {
    buildIndex(): estypes.IndicesCreateRequest {
        return {
            index: LocationResource.LOCATION,
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
