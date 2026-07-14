import { Injectable, type OnModuleInit } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { BillElasticsearchIndex } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.index';

@Injectable()
export class BillSearchIndexRegisterService implements OnModuleInit {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly billElasticsearchIndex: BillElasticsearchIndex,
    ) {}

    async onModuleInit(): Promise<void> {
        try {
            await this.elasticsearchService.createIndex(this.billElasticsearchIndex.buildIndex());
        } catch {
            throw new Error('Could not register the bill elasticsearch index');
        }
    }
}
