import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/features/authentication/authentication.module';
import { CacheModule } from '@/core/features/cache/cache.module';
import { CursorPaginationModule } from '@/core/features/pagination/cursor/cursorPagination.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { OutboxModule } from '@/modules/outbox/outbox.module';
import { CreateReceiverHandler } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.handler';
import { DeleteReceiverHandler } from '@/modules/receiver/applications/commands/deleteReceiver/deleteReceiver.handler';
import { UpdateReceiverHandler } from '@/modules/receiver/applications/commands/updateReceiver/updateReceiver.handler';
import { CreatedReceiverCacheInvalidatorHandler } from '@/modules/receiver/applications/messages/createdReceiver/createdReceiverCacheInvalidator.handler';
import { CreatedReceiverElasticsearchIndexerHandler } from '@/modules/receiver/applications/messages/createdReceiver/createdReceiverElasticsearchIndexer.handler';
import { DeletedReceiverCacheInvalidatorHandler } from '@/modules/receiver/applications/messages/deletedReceiver/deletedReceiverCacheInvalidator.handler';
import { DeletedReceiverElasticsearchRemoverHandler } from '@/modules/receiver/applications/messages/deletedReceiver/deletedReceiverElasticearchRemover.handler';
import { DeletedUserReceiverCacheInvalidatorHandler } from '@/modules/receiver/applications/messages/deletedUser/deletedUserReceiverCacheInvalidator.handler';
import { DeletedUserReceiverElasticsearchRemoverHandler } from '@/modules/receiver/applications/messages/deletedUser/deletedUserReceiverMessageElasticsearchRemover.handler';
import { ReceiverCacheInvalidatorProcessor } from '@/modules/receiver/applications/messages/receiverCacheInvalidator.processor';
import { ReceiverElasticsearchIndexerProcessor } from '@/modules/receiver/applications/messages/receiverElasticsearchIndexer.processor';
import { UpdatedReceiverCacheInvalidatorHandler } from '@/modules/receiver/applications/messages/updatedReceiver/updatedReceiverCacheInvalidator.handler';
import { UpdatedReceiverElasticsearchIndexerHandler } from '@/modules/receiver/applications/messages/updatedReceiver/updatedReceiverElasticsearchIndexer.handler';
import { ReceiverListCursorPaginationDefinition } from '@/modules/receiver/applications/pagination/cursor/receiverListCursorPagination.definition';
import { ExistsReceiverByUserIdAndExcludingIdAndNameHandler } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndExcludingIdAndName/existsReceiverByUserIdAndExcludingIdAndName.handler';
import { ExistsReceiverByUserIdAndIdHandler } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndId/existsReceiverByUserIdAndId.handler';
import { ExistsReceiverByUserIdAndNameHandler } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndName/existsReceiverByUserIdAndName.handler';
import { FindManyReceiversByUserIdAndIdsHandler } from '@/modules/receiver/applications/queries/findManyReceiversByUserIdAndIds/findManyReceiversByUserIdAndIds.handler';
import { FindReceiverByUserIdAndIdOrThrowHandler } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrThrow/findReceiverByUserIdAndIdOrThrow.handler';
import { FindReceiverListByUserIdHandler } from '@/modules/receiver/applications/queries/findReceiverListByUserId/findReceiverListByUserId.handler';
import { FindTotalReceiversByUserIdHandler } from '@/modules/receiver/applications/queries/findTotalReceiversByUserId/findTotalReceiversByUserId.handler';
import { CreateReceiverService } from '@/modules/receiver/applications/services/createReceiver.service';
import { DeleteReceiverService } from '@/modules/receiver/applications/services/deleteReceiver.service';
import { FindReceiverListAndTotalByUserIdService } from '@/modules/receiver/applications/services/findReceiverListAndTotalByUserId.service';
import { FindReceiverListByUserIdService } from '@/modules/receiver/applications/services/findReceiverListByUserId.service';
import { ReceiverService } from '@/modules/receiver/applications/services/receiver.service';
import { ReceiverSearchService } from '@/modules/receiver/applications/services/search/receiverSearch.service';
import { ReceiverSearchAggregateService } from '@/modules/receiver/applications/services/search/receiverSearchAggregate.service';
import { ReceiverSearchIndexRegisterService } from '@/modules/receiver/applications/services/search/receiverSearchIndexRegister.service';
import { ReceiverSearchSyncService } from '@/modules/receiver/applications/services/search/receiverSearchSync.service';
import { UpdateReceiverService } from '@/modules/receiver/applications/services/updateReceiver.service';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';
import { ReceiverNameAvailableValidatorService } from '@/modules/receiver/applications/services/validators/receiverNameAvailableValidator.service';
import { ReceiverUniqueNameValidatorService } from '@/modules/receiver/applications/services/validators/receiverUniqueNameValidator.service';
import { ReceiverElasticsearchIndex } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearch.index';
import { ReceiverElasticsearchQuery } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearch.query';
import { ReceiverElasticsearchDeleteQuery } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearchDelete.query';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';
import { ReceiverController } from '@/modules/receiver/interfaces/controllers/v1.controller';

@Module({
    imports: [
        CqrsModule,
        AuthenticationModule,
        ElasticsearchModule,
        OutboxModule,
        QueryDispatcherModule,
        CacheModule,
        CursorPaginationModule,
    ],
    controllers: [ReceiverController],
    providers: [
        CreateReceiverHandler,
        DeleteReceiverHandler,
        UpdateReceiverHandler,
        FindManyReceiversByUserIdAndIdsHandler,
        FindReceiverByUserIdAndIdOrThrowHandler,
        FindReceiverListAndTotalByUserIdService,
        FindReceiverListByUserIdHandler,
        FindTotalReceiversByUserIdHandler,
        FindReceiverListByUserIdService,
        ExistsReceiverByUserIdAndIdHandler,
        ExistsReceiverByUserIdAndExcludingIdAndNameHandler,
        ExistsReceiverByUserIdAndNameHandler,
        CreatedReceiverElasticsearchIndexerHandler,
        DeletedReceiverElasticsearchRemoverHandler,
        DeletedUserReceiverElasticsearchRemoverHandler,
        UpdatedReceiverElasticsearchIndexerHandler,
        ReceiverService,
        CreateReceiverService,
        UpdateReceiverService,
        DeleteReceiverService,
        ReceiverRepository,
        ReceiverElasticsearchIndex,
        ReceiverElasticsearchQuery,
        ReceiverElasticsearchDeleteQuery,
        ReceiverSearchService,
        ReceiverSearchAggregateService,
        ReceiverSearchIndexRegisterService,
        ReceiverExistenceValidatorService,
        ReceiverUniqueNameValidatorService,
        ReceiverNameAvailableValidatorService,
        ReceiverSearchSyncService,
        ReceiverElasticsearchIndexerProcessor,
        ReceiverCacheInvalidatorProcessor,
        CreatedReceiverCacheInvalidatorHandler,
        DeletedReceiverCacheInvalidatorHandler,
        DeletedUserReceiverCacheInvalidatorHandler,
        UpdatedReceiverCacheInvalidatorHandler,
        ReceiverListCursorPaginationDefinition,
    ],
    exports: [
        ReceiverSearchService,
        ReceiverSearchAggregateService,
        ReceiverExistenceValidatorService,
        ReceiverSearchSyncService,
    ],
})
export class ReceiverModule {}
