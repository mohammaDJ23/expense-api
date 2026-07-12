import { Injectable, type OnModuleInit } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { ConsumerElasticsearchIndex } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearch.index';

@Injectable()
export class ConsumerSearchIndexRegisterService implements OnModuleInit {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly consumerElasticsearchIndex: ConsumerElasticsearchIndex,
    ) {}

    async onModuleInit(): Promise<void> {
        try {
            await this.elasticsearchService.createIndex(
                this.consumerElasticsearchIndex.buildIndex(),
            );
        } catch {
            throw new Error('Could not register the consumer elasticsearch index');
        }
    }
}
