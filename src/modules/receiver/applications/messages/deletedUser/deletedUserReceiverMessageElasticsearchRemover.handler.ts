import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { ReceiverElasticsearchDeleteQuery } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearchDelete.query';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler()
export class DeletedUserReceiverElasticsearchRemoverHandler implements IMessageHandler<ISelectUser> {
    route: TOutboxEventRoute = 'users.deleted';
    private readonly concurrency = pLimit(2);

    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly receiverElasticsearchDeleteQuery: ReceiverElasticsearchDeleteQuery,
    ) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await Promise.all(
            batch.map((item) =>
                this.concurrency(() =>
                    this.elasticsearchService.deleteByQuery(
                        this.receiverElasticsearchDeleteQuery.buildQuery({
                            userId: item.payload.id,
                        }),
                    ),
                ),
            ),
        );
    }
}
