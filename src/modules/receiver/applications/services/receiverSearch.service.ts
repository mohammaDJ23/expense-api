import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { ReceiverElasticsearchQuery } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearch.query';

import type { IElasticsearchSearch } from '@/infrastructure/elasticsearch/elasticsearchSearch.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class ReceiverSearchService implements IElasticsearchSearch {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly receiverElasticsearchQuery: ReceiverElasticsearchQuery,
    ) {}

    async search(userId: string, query: string, size: number): Promise<string[]> {
        try {
            const response = await this.elasticsearchService.search<ISelectReceiver>(
                this.receiverElasticsearchQuery.buildQuery(userId, query, size),
            );

            {
                const receiverDocs = this.elasticsearchService.extractDocs(response);
                return receiverDocs.map((doc) => doc.id);
            }
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
