import { Injectable } from '@nestjs/common';

import { BillResource } from '@/modules/bill/bill.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
}

@Injectable()
export class BillElasticsearchDeleteQuery implements IElasticsearchQuery<
    IInput,
    estypes.DeleteByQueryRequest
> {
    index: TOutboxEventAggregateType = BillResource.BILL;

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
