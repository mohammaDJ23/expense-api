import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { LocationElasticsearchQuery } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearch.query';

import type { IElasticsearchSearch } from '@/infrastructure/elasticsearch/elasticsearchSearch.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class LocationSearchService implements IElasticsearchSearch {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly locationElasticsearchQuery: LocationElasticsearchQuery,
    ) {}

    async search(userId: string, query: string, size: number): Promise<string[]> {
        try {
            const response = await this.elasticsearchService.search<ISelectLocation>(
                this.locationElasticsearchQuery.buildQuery({ userId, query, size }),
            );

            const locationDocs = this.elasticsearchService.extractDocs(response);
            return locationDocs.map((doc) => doc.id);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
