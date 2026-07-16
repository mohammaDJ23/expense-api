import { Injectable, type OnModuleInit } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { LocationElasticsearchIndex } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearch.index';

@Injectable()
export class LocationSearchIndexRegisterService implements OnModuleInit {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly locationElasticsearchIndex: LocationElasticsearchIndex,
    ) {}

    async onModuleInit(): Promise<void> {
        try {
            await this.elasticsearchService.createIndex(
                this.locationElasticsearchIndex.buildIndex(),
            );
        } catch {
            throw new Error('Could not register the location elasticsearch index');
        }
    }
}
