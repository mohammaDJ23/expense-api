import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { FindUserIdListElasticsearchService } from '@/modules/search/applications/services/findUserIdListElasticsearch.service';
import { DeleteDocsByUserIdsElasticsearchQuery } from '@/modules/search/infrastructure/elasticsearch/deleteDocsByUserIdsElasticsearch.query';
import { FindUserIdListService } from '@/modules/user/applications/services/findUserIdList.service';

import type { IJob } from '@/core/interfaces/job.interface';
import type { estypes } from '@elastic/elasticsearch';

@Injectable()
export class CleanupOrphanDocumentsElasticsearchJob implements IJob {
    constructor(
        private readonly findUserIdListElasticsearchService: FindUserIdListElasticsearchService,
        private readonly deleteDocsByUserIdsElasticsearchQuery: DeleteDocsByUserIdsElasticsearchQuery,
        private readonly findUserIdListService: FindUserIdListService,
        private readonly cursorPaginationService: CursorPaginationService,
        private readonly elasticsearchService: ElasticSearchService,
    ) {}

    @Cron(CronExpression.EVERY_WEEK)
    async run(): Promise<void> {
        const userIds: string[] = [];

        for await (const userId of this.findOrphanUserIds()) {
            userIds.push(userId);

            if (userIds.length >= MAX_LIST_LIMIT) {
                await this.deleteDocsByUserIds(userIds);

                userIds.length = 0;
            }
        }

        if (userIds.length > 0) {
            await this.deleteDocsByUserIds(userIds);
        }
    }

    private async *findOrphanUserIds(): AsyncGenerator<string, void, void> {
        const dbUserIdsIterator = this.dbUserIdsIterator();
        const esUserIdsIterator = this.esUserIdsIterator();

        let db = await dbUserIdsIterator.next();
        let es = await esUserIdsIterator.next();

        while (!db.done && !es.done) {
            const dbId = db.value;
            const esId = es.value;

            if (esId < dbId) {
                yield esId;
                es = await esUserIdsIterator.next();
                continue;
            }

            if (dbId < esId) {
                db = await dbUserIdsIterator.next();
                continue;
            }

            db = await dbUserIdsIterator.next();
            es = await esUserIdsIterator.next();
        }

        while (!es.done) {
            yield es.value;
            es = await esUserIdsIterator.next();
        }
    }

    private async deleteDocsByUserIds(userIds: string[]): Promise<void> {
        await this.elasticsearchService.deleteByQuery(
            this.deleteDocsByUserIdsElasticsearchQuery.buildQuery({
                userIds,
            }),
        );
    }

    private async *dbUserIdsIterator(): AsyncGenerator<string, void, void> {
        yield* this.cursorPaginationService.cursorItemsIterator<string>((cursor) =>
            this.findUserIdListService.execute({
                query: {
                    limit: MAX_LIST_LIMIT,
                    cursor,
                },
            }),
        );
    }

    private async *esUserIdsIterator(): AsyncGenerator<string, void, void> {
        let after: estypes.AggregationsCompositeAggregateKey | null = null;

        while (true) {
            const response = await this.findUserIdListElasticsearchService.execute({
                size: MAX_LIST_LIMIT,
                after,
            });

            for (const userId of response.userIds) {
                yield userId;
            }

            if (!response.after) {
                break;
            }

            after = response.after;
        }
    }
}
