import { Injectable } from '@nestjs/common';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
    query: string;
    size: number;
}

@Injectable()
export class BillElasticsearchQuery implements IElasticsearchQuery<IInput> {
    index: TOutboxEventAggregateType = 'bills';

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
                                        term: {
                                            amount: {
                                                value: input.query,
                                                boost: 5,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            description: {
                                                query: input.query,
                                                fuzziness: 'AUTO',
                                                boost: 5,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'description.partial': {
                                                query: input.query,
                                                boost: 3,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'receiver.name': {
                                                query: input.query,
                                                fuzziness: 'AUTO',
                                                boost: 4,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'receiver.name.partial': {
                                                query: input.query,
                                                boost: 2,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'location.name': {
                                                query: input.query,
                                                fuzziness: 'AUTO',
                                                boost: 4,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'location.name.partial': {
                                                query: input.query,
                                                boost: 2,
                                            },
                                        },
                                    },
                                    {
                                        nested: {
                                            path: 'consumers',
                                            query: {
                                                bool: {
                                                    minimum_should_match: 1,
                                                    should: [
                                                        {
                                                            match: {
                                                                'consumers.name': {
                                                                    query: input.query,
                                                                    fuzziness: 'AUTO',
                                                                    boost: 4,
                                                                },
                                                            },
                                                        },
                                                        {
                                                            match: {
                                                                'consumers.name.partial': {
                                                                    query: input.query,
                                                                    boost: 2,
                                                                },
                                                            },
                                                        },
                                                    ],
                                                },
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
