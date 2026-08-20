import { Injectable } from '@nestjs/common';

import { LocationResource } from '@/modules/location/location.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
}

@Injectable()
export class LocationElasticsearchDeleteQuery implements IElasticsearchQuery<
    IInput,
    estypes.DeleteByQueryRequest
> {
    index: TOutboxEventAggregateType = LocationResource.LOCATION;

    buildQuery(input: IInput): estypes.DeleteByQueryRequest {
        return {
            index: this.index,
            query: {
                term: {
                    userId: input.userId,
                },
            },
        };
    }
}
