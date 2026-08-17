import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/features/authentication/authentication.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { OutboxModule } from '@/modules/outbox/outbox.module';
import { CreateReceiverHandler } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.handler';
import { DeleteReceiverHandler } from '@/modules/receiver/applications/commands/deleteReceiver/deleteReceiver.handler';
import { UpdateReceiverHandler } from '@/modules/receiver/applications/commands/updateReceiver/updateReceiver.handler';
import { CreatedReceiverMessageElasticsearchHandler } from '@/modules/receiver/applications/messages/createdReceiver/createdReceiverMessageElasticsearch.handler';
import { DeletedReceiverMessageElasticsearchHandler } from '@/modules/receiver/applications/messages/deletedReceiver/deletedReceiverMessageElasticearch.handler';
import { DeletedUserMessageElasticsearchHandler } from '@/modules/receiver/applications/messages/deletedUser/deletedUserMessageElasticsearch.handler';
import { UpdatedReceiverMessageElasticsearchHandler } from '@/modules/receiver/applications/messages/updatedReceiver/updatedReceiverMessageElasticsearch.handler';
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
        CreatedReceiverMessageElasticsearchHandler,
        UpdatedReceiverMessageElasticsearchHandler,
        DeletedReceiverMessageElasticsearchHandler,
        DeletedUserMessageElasticsearchHandler,
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
    ],
    exports: [
        ReceiverSearchService,
        ReceiverSearchAggregateService,
        ReceiverExistenceValidatorService,
        ReceiverSearchSyncService,
    ],
})
export class ReceiverModule {}
