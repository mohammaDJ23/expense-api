import { Injectable } from '@nestjs/common';

import { ReceiverResource } from '@/modules/receiver/receiver.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
}

@Injectable()
export class ReceiverElasticsearchDeleteQuery implements IElasticsearchQuery<
    IInput,
    estypes.DeleteByQueryRequest
> {
    index: TOutboxEventAggregateType = ReceiverResource.RECEIVER;

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
