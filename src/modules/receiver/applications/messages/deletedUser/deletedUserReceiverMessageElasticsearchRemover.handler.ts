import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { concurrency } from '@/core/utils/concurrency.util';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { DeleteReceiversElasticsearchQuery } from '@/modules/receiver/infrastructure/elasticsearch/deleteReceiversElasticsearch.query';
import { UserMessageEvent } from '@/modules/user/domain/enums/userMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler(UserMessageEvent.DELETED_USER)
export class DeletedUserReceiverElasticsearchRemoverHandler implements IMessageHandler<ISelectUser> {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly deleteReceiversElasticsearchQuery: DeleteReceiversElasticsearchQuery,
    ) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await Promise.all(
            batch.map((item) =>
                concurrency(() =>
                    this.elasticsearchService.deleteByQuery(
                        this.deleteReceiversElasticsearchQuery.buildQuery({
                            userId: item.payload.id,
                        }),
                    ),
                ),
            ),
        );
    }
}
