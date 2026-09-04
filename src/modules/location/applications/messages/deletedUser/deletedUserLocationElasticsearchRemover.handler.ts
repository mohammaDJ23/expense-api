import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { concurrency } from '@/core/utils/concurrency.util';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { DeleteLocationsElasticsearchQuery } from '@/modules/location/infrastructure/elasticsearch/deleteLocationsElasticsearch.query';
import { UserMessageEvent } from '@/modules/user/domain/enums/userMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler(UserMessageEvent.DELETED_USER)
export class DeletedUserLocationElasticsearchRemoverHandler implements IMessageHandler<ISelectUser> {
    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly deleteLocationsElasticsearchQuery: DeleteLocationsElasticsearchQuery,
    ) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await Promise.all(
            batch.map((item) =>
                concurrency(() =>
                    this.elasticsearchService.deleteByQuery(
                        this.deleteLocationsElasticsearchQuery.buildQuery({
                            userId: item.payload.id,
                        }),
                    ),
                ),
            ),
        );
    }
}
