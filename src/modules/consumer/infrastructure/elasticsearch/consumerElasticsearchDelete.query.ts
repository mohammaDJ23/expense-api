import { Injectable } from '@nestjs/common';

import { ConsumerResource } from '@/modules/consumer/consumer.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
}

@Injectable()
export class ConsumerElasticsearchDeleteQuery implements IElasticsearchQuery<
    IInput,
    estypes.DeleteByQueryRequest
> {
    index: TOutboxEventAggregateType = ConsumerResource.CONSUMER;

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
