import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { isNotEmpty } from '@/common/utils/isNotEmpty.util';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';

import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessageProcessor } from '@/core/message/messageProcessor.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class UpdateReceiverMessageElasticsearchProcessor implements IMessageProcessor<ISelectReceiver> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async process(batch: IMessageBatch<ISelectReceiver>[]): Promise<void> {
        try {
            const operations = batch.flatMap<[estypes.BulkOperationContainer, ISelectReceiver]>(
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

            if (isNotEmpty(operations)) {
                await this.elasticsearchService.client.bulk({
                    operations,
                });
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
