import { Injectable } from '@nestjs/common';

import { LocationResource } from '@/modules/location/location.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
    query: string;
    size: number;
}

@Injectable()
export class LocationElasticsearchQuery implements IElasticsearchQuery<
    IInput,
    estypes.SearchRequest
> {
    index: TOutboxEventAggregateType = LocationResource.LOCATION;

    buildQuery(input: IInput): estypes.SearchRequest {
        return {
            size: input.size,
            index: this.index,
            query: {
                bool: {
                    filter: [
                        {
                            term: {
                                userId: input.userId,
                            },
                        },
                    ],
                    must: [
                        {
                            bool: {
                                minimum_should_match: 1,
                                should: [
                                    {
                                        match: {
                                            name: {
                                                query: input.query,
                                                fuzziness: 'AUTO',
                                                boost: 5,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'name.partial': {
                                                query: input.query,
                                                boost: 3,
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        };
    }
}
