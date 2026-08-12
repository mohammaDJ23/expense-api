import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { cursorIterator } from '@/core/utils/pagination/cursorIterator.util';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindLocationListByUserIdService } from '@/modules/location/applications/services//findLocationListByUserId.service';
import { LocationElasticsearchDeleteQuery } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearchDelete.query';

import type { IElasticsearchSync } from '@/infrastructure/elasticsearch/elasticsearchSync.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class LocationSearchSyncService implements IElasticsearchSync {
    constructor(
        private readonly findLocationListByUserIdService: FindLocationListByUserIdService,
        private readonly elasticsearchService: ElasticSearchService,
        private readonly locationElasticsearchDeleteQuery: LocationElasticsearchDeleteQuery,
    ) {}

    async sync(userId: string): Promise<void> {
        const index: TOutboxEventAggregateType = 'locations';

        await this.elasticsearchService.deleteByQuery(
            this.locationElasticsearchDeleteQuery.buildQuery({
                userId,
            }),
        );

        for await (const locations of cursorIterator((cursor) =>
            this.findLocationListByUserIdService.execute({
                userId,
                query: {
                    limit: MAX_LIST_LIMIT,
                    cursor,
                },
            }),
        )) {
            const operations = locations.flatMap<estypes.BulkOperationContainer | ISelectLocation>(
                (location) => [
                    {
                        index: {
                            _index: index,
                            _id: location.id,
                        },
                    },
                    location,
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
