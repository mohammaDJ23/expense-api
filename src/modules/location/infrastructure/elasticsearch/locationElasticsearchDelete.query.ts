import { Injectable } from '@nestjs/common';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userId: string;
}

@Injectable()
export class LocationElasticsearchDeleteQuery implements IElasticsearchQuery<IInput> {
    index: TOutboxEventAggregateType = 'locations';

    buildQuery(input: IInput): estypes.SearchRequest {
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
