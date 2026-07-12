import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { BillElasticsearchQuery } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.query';

import type { IElasticsearchSearch } from '@/infrastructure/elasticsearch/elasticsearchSearch.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class BillSearchService implements IElasticsearchSearch {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly billElasticsearchQuery: BillElasticsearchQuery,
    ) {}

    async search(userId: string, query: string, size: number): Promise<string[]> {
        try {
            const billsSearchResponse = await this.elasticsearchService.client.search<ISelectBill>(
                this.billElasticsearchQuery.buildQuery(userId, query, size),
            );

            {
                const billDocs = this.elasticsearchService.extractDocs(billsSearchResponse);
                return billDocs.map((doc) => doc.id);
            }
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
