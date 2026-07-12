import { Injectable, type OnModuleInit } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { ReceiverElasticsearchIndex } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearch.index';

@Injectable()
export class ReceiverSearchIndexRegisterService implements OnModuleInit {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly receiverElasticsearchIndex: ReceiverElasticsearchIndex,
    ) {}

    async onModuleInit(): Promise<void> {
        try {
            await this.elasticsearchService.createIndex(
                this.receiverElasticsearchIndex.buildIndex(),
            );
        } catch {
            throw new Error('Could not register the receiver elasticsearch index');
        }
    }
}
