import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { BillModule } from '@/modules/bill/bill.module';
import { ConsumerModule } from '@/modules/consumer/consumer.module';
import { LocationModule } from '@/modules/location/location.module';
import { ReceiverModule } from '@/modules/receiver/receiver.module';
import { SearchService } from '@/modules/search/applications/services/search.service';
import { SearchAggregateOrchestratorService } from '@/modules/search/applications/services/searchAggregateOrchestrator.service';
import { SearchOrchestratorService } from '@/modules/search/applications/services/searchOrchestrator.service';
import { SearchController } from '@/modules/search/interfaces/controllers/v1.controller';

@Module({
    imports: [
        CqrsModule,
        AuthenticationModule,
        ElasticsearchModule,
        BillModule,
        ReceiverModule,
        ConsumerModule,
        LocationModule,
    ],
    providers: [SearchService, SearchAggregateOrchestratorService, SearchOrchestratorService],
    controllers: [SearchController],
})
export class SearchModule {}
