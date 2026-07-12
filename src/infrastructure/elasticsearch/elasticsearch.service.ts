import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client, estypes } from '@elastic/elasticsearch';

import { isNotEmpty } from '@/common/utils/isNotEmpty.util';

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

    extractDocs<T>(response: estypes.SearchResponse<T>): T[] {
        return response.hits.hits.flatMap((hit) => (hit._source ? [hit._source] : []));
    }
}
