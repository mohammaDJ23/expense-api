import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindLocationListByUserIdService } from '@/modules/location/applications/services//findLocationListByUserId.service';
import { DeleteLocationsElasticsearchQuery } from '@/modules/location/infrastructure/elasticsearch/deleteLocationsElasticsearch.query';
import { LocationResource } from '@/modules/location/location.enum';

import type { IElasticsearchSync } from '@/infrastructure/elasticsearch/elasticsearchSync.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class LocationSearchSyncService implements IElasticsearchSync {
    constructor(
        private readonly findLocationListByUserIdService: FindLocationListByUserIdService,
        private readonly elasticsearchService: ElasticSearchService,
        private readonly deleteLocationsElasticsearchQuery: DeleteLocationsElasticsearchQuery,
        private readonly cursorPaginationService: CursorPaginationService,
    ) {}

    async sync(userId: string): Promise<void> {
        const index: TOutboxEventAggregateType = LocationResource.LOCATION;

        await this.elasticsearchService.deleteByQuery(
            this.deleteLocationsElasticsearchQuery.buildQuery({
                userId,
            }),
        );

        for await (const locations of this.cursorPaginationService.cursorIterator<
            ISelectLocation,
            string
        >((cursor) =>
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
