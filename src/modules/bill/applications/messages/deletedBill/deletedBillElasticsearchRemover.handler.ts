import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { estypes } from '@elastic/elasticsearch';

@MessageHandler()
export class DeletedBillElasticsearchRemoverHandler implements IMessageHandler<ISelectBill> {
    route: TOutboxEventRoute = 'bill.deleted';

    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async execute(batch: IMessageBatch<ISelectBill>[]): Promise<void> {
        const operations = batch.map<estypes.BulkOperationContainer>((item) => ({
            delete: {
                _index: item.aggregateType,
                _id: item.aggregateId,
            },
        }));

        await this.elasticsearchService.bulk({ operations });
    }
}
