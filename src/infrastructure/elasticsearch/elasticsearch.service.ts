import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client, estypes } from '@elastic/elasticsearch';

import { isNotEmpty } from '@/core/utils/isNotEmpty.util';

import { ELASTICSEARCH_PROVIDER } from './elasticsearch.constants';

@Injectable()
export class ElasticSearchService {
    constructor(
        @Inject(ELASTICSEARCH_PROVIDER)
        private readonly elasticsearch: Client,
    ) {}

    get client(): Client {
        return this.elasticsearch;
    }

    async bulk(data: estypes.BulkRequest): Promise<void> {
        try {
            data.operations = data.operations || [];

            if (isNotEmpty(data.operations)) {
                const response = await this.client.bulk(data);

                if (response.errors) {
                    const errors = response.items
                        .flatMap(Object.values)
                        .map((item) => item.error)
                        .filter(Boolean);

                    throw new Error(
                        `Bulk request failed (${errors.length}/${data.operations.length})`,
                    );
                }
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteByQuery(query: estypes.DeleteByQueryRequest): Promise<void> {
        try {
            await this.client.deleteByQuery(query);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async refresh(index: string): Promise<void> {
        try {
            await this.client.indices.refresh({
                index,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    search<T, A = Record<string, estypes.AggregationsAggregate>>(
        searchRequest: estypes.SearchRequest,
    ): Promise<estypes.SearchResponse<T, A>> {
        return this.client.search<T, A>(searchRequest);
    }

    createIndex(index: estypes.IndicesCreateRequest): Promise<estypes.IndicesCreateResponse> {
        return this.client.indices.create(index, {
            ignore: [400],
        });
    }

    extractDocs<T, A = Record<string, estypes.AggregationsAggregate>>(
        response: estypes.SearchResponse<T, A>,
    ): T[] {
        return response.hits.hits.flatMap((hit) => (hit._source ? [hit._source] : []));
    }
}
