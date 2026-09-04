import { Injectable } from '@nestjs/common';

import { BillResource } from '@/modules/bill/domain/enums/bill.enum';
import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';
import { LocationResource } from '@/modules/location/domain/enums/location.enum';
import { ReceiverResource } from '@/modules/receiver/domain/enums/receiver.enum';

import type { IElasticsearchQuery } from '@/infrastructure/elasticsearch/elasticsearchQuery.interface';
import type { estypes } from '@elastic/elasticsearch';

interface IInput {
    userIds: string[];
}

@Injectable()
export class DeleteDocsByUserIdsElasticsearchQuery implements IElasticsearchQuery<
    IInput,
    estypes.DeleteByQueryRequest
> {
    buildQuery(input: IInput): estypes.DeleteByQueryRequest {
        return {
            index: [
                BillResource.BILL,
                ConsumerResource.CONSUMER,
                LocationResource.LOCATION,
                ReceiverResource.RECEIVER,
            ],
            query: {
                terms: {
                    userId: input.userIds,
                },
            },
        };
    }
}
