import { Injectable, InternalServerErrorException, type OnModuleInit } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/common/common.constants';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { BillElasticsearchDefinition } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.definition';
import { ConsumerElasticsearchDefinition } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearch.definition';
import { LocationElasticsearchDefinition } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearch.definition';
import { ReceiverElasticsearchDefinition } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearch.definition';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IElasticsearchDefinition } from '@/infrastructure/elasticsearch/elasticsearchDefinition.interface';
import type { ISearch } from '@/modules/search/domain/interface/search.interface';
import type { SearchRequestDto } from '@/modules/search/interfaces/dtos/search.request.dto';

@Injectable()
export class SearchService implements IServiceHandler, OnModuleInit {
    private readonly definitions: IElasticsearchDefinition[];

    // eslint-disable-next-line max-params
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly billElasticsearchDefinition: BillElasticsearchDefinition,
        private readonly consumerElasticsearchDefinition: ConsumerElasticsearchDefinition,
        private readonly receiverElasticsearchDefinition: ReceiverElasticsearchDefinition,
        private readonly locationElasticsearchDefinition: LocationElasticsearchDefinition,
    ) {
        this.definitions = [
            this.billElasticsearchDefinition,
            this.consumerElasticsearchDefinition,
            this.receiverElasticsearchDefinition,
            this.locationElasticsearchDefinition,
        ];
    }

    async onModuleInit(): Promise<void> {
        try {
            await Promise.all(
                this.definitions.map((definition) =>
                    this.elasticsearchService.client.indices.create(
                        {
                            index: definition.index,
                            settings: definition.settings,
                            mappings: definition.mappings,
                        },
                        { ignore: [400] },
                    ),
                ),
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async execute(userId: string, data: SearchRequestDto): Promise<ISearch> {
        try {
            const query = data.q ?? '';
            const size = data.limit ?? MAX_LIST_LIMIT;

            const searchResponse = await this.elasticsearchService.client.search({
                size,
                index: this.definitions.map((definition) => definition.index),
                query: {
                    bool: {
                        should: this.definitions.map((definition) =>
                            definition.createSearchQuery(query),
                        ),
                    },
                },
            });

            console.log(searchResponse.hits.hits);

            return {};
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
