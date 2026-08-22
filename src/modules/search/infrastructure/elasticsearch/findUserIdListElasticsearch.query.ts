import { Injectable } from '@nestjs/common';

import { BillResource } from '@/modules/bill/bill.enum';
import { ConsumerResource } from '@/modules/consumer/consumer.enum';
import { LocationResource } from '@/modules/location/location.enum';
import { ReceiverResource } from '@/modules/receiver/receiver.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    size: number;
    after: estypes.AggregationsCompositeAggregateKey | null;
}

@Injectable()
export class FindUserIdListElasticsearchQuery implements IElasticsearchQuery<
    IInput,
    estypes.SearchRequest
> {
    buildQuery(input: IInput): estypes.SearchRequest {
        return {
            size: 0,
            index: [
                BillResource.BILL,
                ConsumerResource.CONSUMER,
                LocationResource.LOCATION,
                ReceiverResource.RECEIVER,
            ],
            aggs: {
                userIds: {
                    composite: {
                        size: input.size,
                        sources: [
                            {
                                userId: {
                                    terms: {
                                        field: 'userId',
                                        order: 'asc',
                                    },
                                },
                            },
                        ],
                        ...(input.after
                            ? {
                                  after: input.after,
                              }
                            : {}),
                    },
                },
            },
        };
    }
}
