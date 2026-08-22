import { Injectable } from '@nestjs/common';

import { ConsumerResource } from '@/modules/consumer/consumer.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
}

@Injectable()
export class ConsumerElasticsearchDeleteQuery implements IElasticsearchQuery<
    IInput,
    estypes.DeleteByQueryRequest
> {
    buildQuery(input: IInput): estypes.DeleteByQueryRequest {
        return {
            index: ConsumerResource.CONSUMER,
            query: {
                term: {
                    userId: input.userId,
                },
            },
        };
    }
}
