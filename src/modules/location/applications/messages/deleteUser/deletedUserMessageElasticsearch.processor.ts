import { Injectable } from '@nestjs/common';
import pLimit from 'p-limit';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { LocationElasticsearchDeleteQuery } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearchDelete.query';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class DeleteUserMessageElasticsearchProcessor implements IMessageProcessor<ISelectUser> {
    private readonly concurrency = pLimit(2);

    constructor(
        private readonly elasticsearchService: ElasticSearchService,
        private readonly locationElasticsearchDeleteQuery: LocationElasticsearchDeleteQuery,
    ) {}

    async process(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await Promise.all(
            batch.map((item) =>
                this.concurrency(() =>
                    this.elasticsearchService.deleteByQuery(
                        this.locationElasticsearchDeleteQuery.buildQuery({
                            userId: item.aggregateId,
                        }),
                    ),
                ),
            ),
        );
    }
}
