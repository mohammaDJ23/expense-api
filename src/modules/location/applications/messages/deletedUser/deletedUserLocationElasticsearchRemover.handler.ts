import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { LocationElasticsearchDeleteQuery } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearchDelete.query';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler()
export class DeletedUserLocationElasticsearchRemoverHandler implements IMessageHandler<ISelectUser> {
    route: TOutboxEventRoute = 'user.deleted';
    private readonly concurrency = pLimit(2);

    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly locationElasticsearchDeleteQuery: LocationElasticsearchDeleteQuery,
    ) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await Promise.all(
            batch.map((item) =>
                this.concurrency(() =>
                    this.elasticsearchService.deleteByQuery(
                        this.locationElasticsearchDeleteQuery.buildQuery({
                            userId: item.payload.id,
                        }),
                    ),
                ),
            ),
        );
    }
}
