import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { estypes } from '@elastic/elasticsearch';

@MessageHandler()
export class UpdatedConsumerMessageElasticsearchHandler implements IMessageHandler<ISelectConsumer> {
    route: TOutboxEventRoute = 'consumers.updated';

    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async execute(batch: IMessageBatch<ISelectConsumer>[]): Promise<void> {
        const operations = batch.flatMap<estypes.BulkOperationContainer | ISelectConsumer>(
            (item) => [
                {
                    index: {
                        _index: item.aggregateType,
                        _id: item.aggregateId,
                    },
                },
                item.payload,
            ],
        );

        await this.elasticsearchService.bulk({ operations });
    }
}
