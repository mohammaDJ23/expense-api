import { Inject, Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

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
}
