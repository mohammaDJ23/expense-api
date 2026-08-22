import { Injectable } from '@nestjs/common';

import { BillResource } from '@/modules/bill/bill.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
}

@Injectable()
export class BillElasticsearchDeleteQuery implements IElasticsearchQuery<
    IInput,
    estypes.DeleteByQueryRequest
> {
    buildQuery(input: IInput): estypes.DeleteByQueryRequest {
        return {
            index: BillResource.BILL,
            query: {
                term: {
                    userId: input.userId,
                },
            },
        };
    }
}
