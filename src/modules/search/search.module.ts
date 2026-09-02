import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CursorPaginationModule } from '@/core/features/pagination/cursor/cursorPagination.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { BillModule } from '@/modules/bill/bill.module';
import { ConsumerModule } from '@/modules/consumer/consumer.module';
import { LocationModule } from '@/modules/location/location.module';
import { ReceiverModule } from '@/modules/receiver/receiver.module';
import { FindUserIdListElasticsearchService } from '@/modules/search/applications/services/findUserIdListElasticsearch.service';
import { CleanupOrphanDocumentsElasticsearchJob } from '@/modules/search/applications/services/jobs/cleanupOrphanDocumentsElasticsearch.job';
import { SearchService } from '@/modules/search/applications/services/search.service';
import { SearchAggregateOrchestratorService } from '@/modules/search/applications/services/searchAggregateOrchestrator.service';
import { SearchOrchestratorService } from '@/modules/search/applications/services/searchOrchestrator.service';
import { SearchQueryService } from '@/modules/search/applications/services/searchQuery.service';
import { SearchSyncService } from '@/modules/search/applications/services/searchSync.service';
import { DeleteDocsByUserIdsElasticsearchQuery } from '@/modules/search/infrastructure/elasticsearch/deleteDocsByUserIdsElasticsearch.query';
import { FindUserIdListElasticsearchQuery } from '@/modules/search/infrastructure/elasticsearch/findUserIdListElasticsearch.query';
import { SearchController } from '@/modules/search/interfaces/controllers/v1.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [
        CqrsModule,
        ElasticsearchModule,
        BillModule,
        ReceiverModule,
        ConsumerModule,
        LocationModule,
        UserModule,
        CursorPaginationModule,
    ],
    providers: [
        SearchService,
        SearchQueryService,
        SearchAggregateOrchestratorService,
        SearchOrchestratorService,
        SearchSyncService,
        FindUserIdListElasticsearchQuery,
        FindUserIdListElasticsearchService,
        DeleteDocsByUserIdsElasticsearchQuery,
        CleanupOrphanDocumentsElasticsearchJob,
    ],
    controllers: [SearchController],
})
export class SearchModule {}
