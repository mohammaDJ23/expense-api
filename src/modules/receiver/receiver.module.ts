import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/features/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { OutboxModule } from '@/modules/outbox/outbox.module';
import { CreateReceiverHandler } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.handler';
import { DeleteReceiverHandler } from '@/modules/receiver/applications/commands/deleteReceiver/deleteReceiver.handler';
import { UpdateReceiverHandler } from '@/modules/receiver/applications/commands/updateReceiver/updateReceiver.handler';
import { CreateReceiverMessageHandler } from '@/modules/receiver/applications/messages/createReceiver/createReceiverMessage.handler';
import { CreateReceiverMessageElasticsearchProcessor } from '@/modules/receiver/applications/messages/createReceiver/createReceiverMessageElasticsearch.processor';
import { DeleteReceiverMessageHandler } from '@/modules/receiver/applications/messages/deleteReceiver/deleteReceiverMessage.handler';
import { DeleteReceiverMessageElasticsearchProcessor } from '@/modules/receiver/applications/messages/deleteReceiver/deleteReceiverMessageElasticsearch.processor';
import { UpdateReceiverMessageHandler } from '@/modules/receiver/applications/messages/updateReceiver/updateReceiverMessage.handler';
import { UpdateReceiverMessageElasticsearchProcessor } from '@/modules/receiver/applications/messages/updateReceiver/updateReceiverMessageElasticsearch.processor';
import { ExistsReceiverByUserIdAndExcludingIdAndNameHandler } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndExcludingIdAndName/existsReceiverByUserIdAndExcludingIdAndName.handler';
import { ExistsReceiverByUserIdAndIdHandler } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndId/existsReceiverByUserIdAndId.handler';
import { ExistsReceiverByUserIdAndNameHandler } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndName/existsReceiverByUserIdAndName.handler';
import { FindManyReceiversByUserIdAndIdsHandler } from '@/modules/receiver/applications/queries/findManyReceiversByUserIdAndIds/findManyReceiversByUserIdAndIds.handler';
import { FindReceiverByUserIdAndIdOrNullHandler } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrNull/findReceiverByUserIdAndIdOrNull.handler';
import { FindReceiverByUserIdAndIdOrThrowHandler } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrThrow/findReceiverByUserIdAndIdOrThrow.handler';
import { FindReceiverByUserIdAndNameOrNullHandler } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndNameOrNull/findReceiverByUserIdAndNameOrNull.handler';
import { FindReceiverListByUserIdHandler } from '@/modules/receiver/applications/queries/findReceiverListByUserId/findReceiverListByUserId.handler';
import { FindTotalReceiversByUserIdHandler } from '@/modules/receiver/applications/queries/findTotalReceiversByUserId/findTotalReceiversByUserId.handler';
import { CreateReceiverService } from '@/modules/receiver/applications/services/createReceiver.service';
import { DeleteReceiverService } from '@/modules/receiver/applications/services/deleteReceiver.service';
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
    imports: [CqrsModule, AuthenticationModule, ElasticsearchModule, OutboxModule],
    controllers: [ReceiverController],
    providers: [
        CreateReceiverHandler,
        DeleteReceiverHandler,
        UpdateReceiverHandler,
        FindManyReceiversByUserIdAndIdsHandler,
        FindReceiverByUserIdAndIdOrNullHandler,
        FindReceiverByUserIdAndIdOrThrowHandler,
        FindReceiverByUserIdAndNameOrNullHandler,
        FindReceiverListByUserIdHandler,
        FindTotalReceiversByUserIdHandler,
        FindReceiverListByUserIdService,
        ExistsReceiverByUserIdAndIdHandler,
        ExistsReceiverByUserIdAndExcludingIdAndNameHandler,
        ExistsReceiverByUserIdAndNameHandler,
        CreateReceiverMessageElasticsearchProcessor,
        CreateReceiverMessageHandler,
        UpdateReceiverMessageHandler,
        UpdateReceiverMessageElasticsearchProcessor,
        DeleteReceiverMessageHandler,
        DeleteReceiverMessageElasticsearchProcessor,
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
