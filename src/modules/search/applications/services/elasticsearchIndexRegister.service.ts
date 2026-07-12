import { Injectable, type OnModuleInit } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { BillElasticsearchIndex } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.index';
import { ConsumerElasticsearchIndex } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearch.index';
import { LocationElasticsearchIndex } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearch.index';
import { ReceiverElasticsearchIndex } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearch.index';

import type { IElasticsearchIndex } from '@/infrastructure/elasticsearch/elasticsearchIndex.interface';

@Injectable()
export class ElasticsearchIndexRegisterService implements OnModuleInit {
    // eslint-disable-next-line max-params
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly billElasticsearchIndex: BillElasticsearchIndex,
        private readonly consumerElasticsearchIndex: ConsumerElasticsearchIndex,
        private readonly locationElasticsearchIndex: LocationElasticsearchIndex,
        private readonly receiverElasticsearchIndex: ReceiverElasticsearchIndex,
    ) {}

    async onModuleInit(): Promise<void> {
        try {
            const elasticsearchIndexes: IElasticsearchIndex[] = [
                this.billElasticsearchIndex,
                this.consumerElasticsearchIndex,
                this.locationElasticsearchIndex,
                this.receiverElasticsearchIndex,
            ];
            await Promise.all(
                elasticsearchIndexes.map((elasticsearchIndex) =>
                    this.elasticsearchService.client.indices.create(
                        elasticsearchIndex.buildIndex(),
                    ),
                ),
            );
        } catch {
            throw new Error('Could not register the elasticsearch indexes');
        }
    }
}
