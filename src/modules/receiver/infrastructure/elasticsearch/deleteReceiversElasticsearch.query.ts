import { Injectable } from '@nestjs/common';

import { ReceiverResource } from '@/modules/receiver/receiver.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
}

@Injectable()
export class DeleteReceiversElasticsearchQuery implements IElasticsearchQuery<
    IInput,
    estypes.DeleteByQueryRequest
> {
    buildQuery(input: IInput): estypes.DeleteByQueryRequest {
        return {
            index: ReceiverResource.RECEIVER,
            query: {
                term: {
                    userId: input.userId,
                },
            },
        };
    }
}
