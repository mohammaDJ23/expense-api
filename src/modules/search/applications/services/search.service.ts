import { Injectable, InternalServerErrorException, type OnModuleInit } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { MAX_LIST_LIMIT } from '@/common/common.constants';
import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindManyBillsByUserIdAndIdsService } from '@/modules/bill/applications/services/findManyBillsByUserIdAndIds.service';
import { BillElasticsearchDefinition } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.definition';
import { FindManyConsumersByUserIdAndIdsQuery } from '@/modules/consumer/applications/queries/findManyConsumersByUserIdAndIds/findManyConsumersByUserIdAndIds.query';
import { ConsumerElasticsearchDefinition } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearch.definition';
import { FindManyLocationsByUserIdAndIdsQuery } from '@/modules/location/applications/queries/findManyLocationsByUserIdAndIds/findManyLocationsByUserIdAndIds.query';
import { LocationElasticsearchDefinition } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearch.definition';
import { FindManyReceiversByUserIdAndIdsQuery } from '@/modules/receiver/applications/queries/findManyReceiversByUserIdAndIds/findManyReceiversByUserIdAndIds.query';
import { ReceiverElasticsearchDefinition } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearch.definition';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IElasticsearchDefinition } from '@/infrastructure/elasticsearch/elasticsearchDefinition.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { ISearch } from '@/modules/search/domain/interface/search.interface';
import type { SearchRequestDto } from '@/modules/search/interfaces/dtos/search.request.dto';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class SearchService implements IServiceHandler, OnModuleInit {
    // eslint-disable-next-line max-params
    constructor(
        private readonly queryBus: QueryBus,
        private readonly elasticsearchService: ElasticSearchService,
        private readonly billElasticsearchDefinition: BillElasticsearchDefinition,
        private readonly consumerElasticsearchDefinition: ConsumerElasticsearchDefinition,
        private readonly receiverElasticsearchDefinition: ReceiverElasticsearchDefinition,
        private readonly locationElasticsearchDefinition: LocationElasticsearchDefinition,
        private readonly findManyBillsByUserIdAndIdsService: FindManyBillsByUserIdAndIdsService,
    ) {}

    async onModuleInit(): Promise<void> {
        try {
            const definitions = [
                this.billElasticsearchDefinition,
                this.consumerElasticsearchDefinition,
                this.receiverElasticsearchDefinition,
                this.locationElasticsearchDefinition,
            ];
            await Promise.all(
                definitions.map((definition) =>
                    this.elasticsearchService.client.indices.create(definition.buildIndex(), {
                        ignore: [400],
                    }),
                ),
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    private getParams(data: SearchRequestDto): Required<SearchRequestDto> {
        const q = data.q ?? '';
        const limit = data.limit ?? MAX_LIST_LIMIT;

        return { q, limit };
    }

    private search<T>(
        definition: IElasticsearchDefinition,
        userId: string,
        params: Required<SearchRequestDto>,
    ) {
        return this.elasticsearchService.client.search<T>(
            definition.buildSearch(userId, params.q, params.limit),
        );
    }

    private extractDocs<T>(response: estypes.SearchResponse<T>): T[] {
        return response.hits.hits.flatMap((hit) => (hit._source ? [hit._source] : []));
    }

    async execute(userId: string, data: SearchRequestDto): Promise<ISearch> {
        try {
            const params = this.getParams(data);
            const [
                billsSearchResponse,
                consumersSearchResponse,
                receiversSearchResponse,
                locationsSearchResponse,
            ] = await Promise.all([
                this.search<ISelectBill>(this.billElasticsearchDefinition, userId, params),
                this.search<ISelectConsumer>(this.consumerElasticsearchDefinition, userId, params),
                this.search<ISelectReceiver>(this.receiverElasticsearchDefinition, userId, params),
                this.search<ISelectLocation>(this.locationElasticsearchDefinition, userId, params),
            ]);

            {
                const billDocs = this.extractDocs(billsSearchResponse);
                const consumerDocs = this.extractDocs(consumersSearchResponse);
                const receiverDocs = this.extractDocs(receiversSearchResponse);
                const locationDocs = this.extractDocs(locationsSearchResponse);

                const billIds = billDocs.map((doc) => doc.id);
                const consumerIds = consumerDocs.map((doc) => doc.id);
                const receiverIds = receiverDocs.map((doc) => doc.id);
                const locationIds = locationDocs.map((doc) => doc.id);

                const [bills, consumers, receivers, locations] = await Promise.all([
                    whenNotEmpty(billIds, (billIds) =>
                        this.findManyBillsByUserIdAndIdsService.execute(userId, billIds),
                    ),
                    whenNotEmpty(consumerIds, (consumerIds) =>
                        this.queryBus.execute<
                            FindManyConsumersByUserIdAndIdsQuery,
                            ISelectConsumer[]
                        >(
                            new FindManyConsumersByUserIdAndIdsQuery({
                                userId,
                                ids: consumerIds,
                            }),
                        ),
                    ),
                    whenNotEmpty(receiverIds, (receiverIds) =>
                        this.queryBus.execute<
                            FindManyReceiversByUserIdAndIdsQuery,
                            ISelectReceiver[]
                        >(
                            new FindManyReceiversByUserIdAndIdsQuery({
                                userId,
                                ids: receiverIds,
                            }),
                        ),
                    ),
                    whenNotEmpty(locationIds, (locationIds) =>
                        this.queryBus.execute<
                            FindManyLocationsByUserIdAndIdsQuery,
                            ISelectLocation[]
                        >(
                            new FindManyLocationsByUserIdAndIdsQuery({
                                userId,
                                ids: locationIds,
                            }),
                        ),
                    ),
                ]);

                return {
                    bills,
                    consumers,
                    locations,
                    receivers,
                };
            }
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
