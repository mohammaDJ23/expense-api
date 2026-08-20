import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { cursorIterator } from '@/core/utils/pagination/cursorIterator.util';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindConsumerListByUserIdService } from '@/modules/consumer/applications/services/findConsumerListByUserId.service';
import { ConsumerResource } from '@/modules/consumer/consumer.enum';
import { ConsumerElasticsearchDeleteQuery } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearchDelete.query';

import type { IElasticsearchSync } from '@/infrastructure/elasticsearch/elasticsearchSync.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class ConsumerSearchSyncService implements IElasticsearchSync {
    constructor(
        private readonly findConsumerListByUserIdService: FindConsumerListByUserIdService,
        private readonly elasticsearchService: ElasticSearchService,
        private readonly consumerElasticsearchDeleteQuery: ConsumerElasticsearchDeleteQuery,
    ) {}

    async sync(userId: string): Promise<void> {
        const index: TOutboxEventAggregateType = ConsumerResource.CONSUMER;

        await this.elasticsearchService.deleteByQuery(
            this.consumerElasticsearchDeleteQuery.buildQuery({
                userId,
            }),
        );

        for await (const consumers of cursorIterator((cursor) =>
            this.findConsumerListByUserIdService.execute({
                userId,
                query: {
                    limit: MAX_LIST_LIMIT,
                    cursor,
                },
            }),
        )) {
            const operations = consumers.flatMap<estypes.BulkOperationContainer | ISelectConsumer>(
                (consumer) => [
                    {
                        index: {
                            _index: index,
                            _id: consumer.id,
                        },
                    },
                    consumer,
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
