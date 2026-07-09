import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client, estypes } from '@elastic/elasticsearch';
import { isNotEmpty } from 'class-validator';

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

    async bulk(operations: estypes.BulkOperationContainer[]): Promise<void> {
        try {
            if (isNotEmpty(operations)) {
                const response = await this.client.bulk({
                    operations,
                });

                if (response.errors) {
                    const errors = response.items
                        .flatMap(Object.values)
                        .map((item) => item.error)
                        .filter(Boolean);

                    throw new Error(`Bulk request failed (${errors.length}/${operations.length})`);
                }
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
