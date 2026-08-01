import { Injectable } from '@nestjs/common';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class BillElasticsearchQuery implements IElasticsearchQuery {
    index: TOutboxEventAggregateType = 'bills';

    buildQuery(userId: string, query: string, size: number): estypes.SearchRequest {
        return {
            size,
            index: this.index,
            query: {
                bool: {
                    filter: [
                        {
                            term: {
                                userId,
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
                                                value: query,
                                                boost: 5,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            description: {
                                                query,
                                                fuzziness: 'AUTO',
                                                boost: 5,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'description.partial': {
                                                query,
                                                boost: 3,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'receiver.name': {
                                                query,
                                                fuzziness: 'AUTO',
                                                boost: 4,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'receiver.name.partial': {
                                                query,
                                                boost: 2,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'location.name': {
                                                query,
                                                fuzziness: 'AUTO',
                                                boost: 4,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            'location.name.partial': {
                                                query,
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
                                                                    query,
                                                                    fuzziness: 'AUTO',
                                                                    boost: 4,
                                                                },
                                                            },
                                                        },
                                                        {
                                                            match: {
                                                                'consumers.name.partial': {
                                                                    query,
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
