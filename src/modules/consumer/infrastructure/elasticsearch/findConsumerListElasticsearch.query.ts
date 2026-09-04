import { Injectable } from '@nestjs/common';

import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
    query: string;
    size: number;
}

@Injectable()
export class FindConsumerListElasticsearchQuery implements IElasticsearchQuery<
    IInput,
    estypes.SearchRequest
> {
    buildQuery(input: IInput): estypes.SearchRequest {
        return {
            size: input.size,
            index: ConsumerResource.CONSUMER,
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
