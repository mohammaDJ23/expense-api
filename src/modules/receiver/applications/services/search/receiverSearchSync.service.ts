import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindReceiverListByUserIdService } from '@/modules/receiver/applications/services/findReceiverListByUserId.service';
import { ReceiverResource } from '@/modules/receiver/domain/enums/receiver.enum';
import { DeleteReceiversElasticsearchQuery } from '@/modules/receiver/infrastructure/elasticsearch/deleteReceiversElasticsearch.query';

import type { IElasticsearchSync } from '@/infrastructure/elasticsearch/elasticsearchSync.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class ReceiverSearchSyncService implements IElasticsearchSync {
    constructor(
        private readonly findReceiverListByUserIdService: FindReceiverListByUserIdService,
        private readonly elasticsearchService: ElasticSearchService,
        private readonly deleteReceiversElasticsearchQuery: DeleteReceiversElasticsearchQuery,
        private readonly cursorPaginationService: CursorPaginationService,
    ) {}

    async sync(userId: string): Promise<void> {
        const index: TOutboxEventAggregateType = ReceiverResource.RECEIVER;

        await this.elasticsearchService.deleteByQuery(
            this.deleteReceiversElasticsearchQuery.buildQuery({
                userId,
            }),
        );

        for await (const receivers of this.cursorPaginationService.cursorIterator<
            ISelectReceiver,
            string
        >((cursor) =>
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
