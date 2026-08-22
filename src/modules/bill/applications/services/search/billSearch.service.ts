import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindBillListElasticsearchQuery } from '@/modules/bill/infrastructure/elasticsearch/findBillListElasticsearch.query';

import type { IElasticsearchSearch } from '@/infrastructure/elasticsearch/elasticsearchSearch.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class BillSearchService implements IElasticsearchSearch {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly findBillListElasticsearchQuery: FindBillListElasticsearchQuery,
    ) {}

    async search(userId: string, query: string, size: number): Promise<string[]> {
        try {
            const response = await this.elasticsearchService.search<ISelectBill>(
                this.findBillListElasticsearchQuery.buildQuery({
                    userId,
                    query,
                    size,
                }),
            );

            const billDocs = this.elasticsearchService.extractDocs(response);
            return billDocs.map((doc) => doc.id);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
