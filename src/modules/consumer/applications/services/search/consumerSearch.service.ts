import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { ConsumerElasticsearchQuery } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearch.query';

import type { IElasticsearchSearch } from '@/infrastructure/elasticsearch/elasticsearchSearch.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class ConsumerSearchService implements IElasticsearchSearch {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly consumerElasticsearchQuery: ConsumerElasticsearchQuery,
    ) {}

    async search(userId: string, query: string, size: number): Promise<string[]> {
        try {
            const response = await this.elasticsearchService.search<ISelectConsumer>(
                this.consumerElasticsearchQuery.buildQuery({ userId, query, size }),
            );

            const consumerDocs = this.elasticsearchService.extractDocs(response);
            return consumerDocs.map((doc) => doc.id);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
