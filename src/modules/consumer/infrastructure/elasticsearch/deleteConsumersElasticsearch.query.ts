import { Injectable } from '@nestjs/common';

import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
}

@Injectable()
export class DeleteConsumersElasticsearchQuery implements IElasticsearchQuery<
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
