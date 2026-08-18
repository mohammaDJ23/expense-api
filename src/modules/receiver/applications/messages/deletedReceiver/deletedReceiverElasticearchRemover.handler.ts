import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { estypes } from '@elastic/elasticsearch';

@MessageHandler()
export class DeletedReceiverElasticsearchRemoverHandler implements IMessageHandler<ISelectReceiver> {
    route: TOutboxEventRoute = 'receivers.deleted';

    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async execute(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        const operations = batch.map<estypes.BulkOperationContainer>((item) => ({
            delete: {
                _index: item.aggregateType,
                _id: item.aggregateId,
            },
        }));

        await this.elasticsearchService.bulk({ operations });
    }
}
