import { Injectable } from '@nestjs/common';

import { LocationResource } from '@/modules/location/location.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
}

@Injectable()
export class LocationElasticsearchDeleteQuery implements IElasticsearchQuery<
    IInput,
    estypes.DeleteByQueryRequest
> {
    buildQuery(input: IInput): estypes.DeleteByQueryRequest {
        return {
            index: LocationResource.LOCATION,
            query: {
                term: {
                    userId: input.userId,
                },
            },
        };
    }
}
