import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { cursorIterator } from '@/core/utils/pagination/cursorIterator.util';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindReceiverListByUserIdService } from '@/modules/receiver/applications/services/findReceiverListByUserId.service';
import { ReceiverElasticsearchDeleteQuery } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearchDelete.query';

import type { IElasticsearchSync } from '@/infrastructure/elasticsearch/elasticsearchSync.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class ReceiverSearchSyncService implements IElasticsearchSync {
    constructor(
        private readonly findReceiverListByUserIdService: FindReceiverListByUserIdService,
        private readonly elasticsearchService: ElasticSearchService,
        private readonly receiverElasticsearchDeleteQuery: ReceiverElasticsearchDeleteQuery,
    ) {}

    async sync(userId: string): Promise<void> {
        const index: TOutboxEventAggregateType = 'receivers';

        await this.elasticsearchService.deleteByQuery(
            this.receiverElasticsearchDeleteQuery.buildQuery({
                userId,
            }),
        );

        for await (const receivers of cursorIterator((cursor) =>
            this.findReceiverListByUserIdService.execute({
                userId,
                query: {
                    limit: MAX_LIST_LIMIT,
                    cursor,
                },
            }),
        )) {
            const operations = receivers.flatMap<estypes.BulkOperationContainer | ISelectReceiver>(
                (receiver) => [
                    {
                        index: {
                            _index: index,
                            _id: receiver.id,
                        },
                    },
                    receiver,
                ],
            );
            await this.elasticsearchService.bulk({
                operations,
                refresh: false,
            });
        }

        await this.elasticsearchService.refresh(index);
    }
}
