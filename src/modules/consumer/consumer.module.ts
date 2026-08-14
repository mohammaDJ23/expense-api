import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/features/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { CreateConsumerHandler } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.handler';
import { CreateManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.handler';
import { DeleteConsumerHandler } from '@/modules/consumer/applications/commands/deleteConsumer/deleteConsumer.handler';
import { DeleteManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/deleteManyBillsConsumers/deleteManyBillsConsumers.handler';
import { UpdateConsumerHandler } from '@/modules/consumer/applications/commands/updateConsumer/updateConsumer.handler';
import { CreatedConsumerMessageElasticsearchHandler } from '@/modules/consumer/applications/messages/createdConsumer/createdConsumerMessageElasticsearch.handler';
import { DeletedConsumerMessageElasticsearchHandler } from '@/modules/consumer/applications/messages/deletedConsumer/deletedConsumerMessageElasticsearch.handler';
import { DeletedUserMessageElasticsearchHandler } from '@/modules/consumer/applications/messages/deletedUser/deletedUserMessageElasticsearch.handler';
import { UpdatedConsumerMessageElasticsearchHandler } from '@/modules/consumer/applications/messages/updatedConsumer/updatedConsumerMessageElasticsearch.handler';
import { ExistsConsumerByUserIdAndExcludingIdAndNameHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndExcludingIdAndName/existsConsumerByUserIdAndExcludingIdAndName.handler';
import { ExistsConsumerByUserIdAndIdHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndId/existsConsumerByUserIdAndId.handler';
import { ExistsConsumerByUserIdAndIdsHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndIds/existsConsumerByUserIdAndIds.handler';
import { ExistsConsumerByUserIdAndNameHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndName/existsConsumerByUserIdAndName.handler';
import { FindConsumerByUserIdAndIdOrNullHandler } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndIdOrNull/findConsumerByUserIdAndIdOrNull.handler';
import { FindConsumerByUserIdAndIdOrThrowHandler } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndIdOrThrow/findConsumerByUserIdAndIdOrThrow.handler';
import { FindConsumerByUserIdAndNameOrNullHandler } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndNameOrNull/findConsumerByUserIdAndNameOrNull.handler';
import { FindConsumerListByUserIdHandler } from '@/modules/consumer/applications/queries/findConsumerListByUserId/findConsumerListByUserId.handler';
import { FindManyBillConsumerTargetsByRefIdsHandler } from '@/modules/consumer/applications/queries/findManyBillConsumerTargetsByRefIds/findManyBillConsumerTargetsByRefIds.handler';
import { FindManyBillsConsumersByRefIdHandler } from '@/modules/consumer/applications/queries/findManyBillsConsumersByRefId/findManyBillsConsumersByRefId.handler';
import { FindManyConsumersByUserIdAndIdsHandler } from '@/modules/consumer/applications/queries/findManyConsumersByUserIdAndIds/findManyConsumersByUserIdAndIds.handler';
import { FindTotalConsumersByUserIdHandler } from '@/modules/consumer/applications/queries/findTotalConsumersByUserId/findTotalConsumersByUserId.handler';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { CreateConsumerService } from '@/modules/consumer/applications/services/createConsumer.service';
import { DeleteConsumerService } from '@/modules/consumer/applications/services/deleteConsumer.service';
import { FindConsumerListAndTotalByUserIdService } from '@/modules/consumer/applications/services/findConsumerListAndTotalByUserId.service';
import { FindConsumerListByUserIdService } from '@/modules/consumer/applications/services/findConsumerListByUserId.service';
import { ConsumerSearchService } from '@/modules/consumer/applications/services/search/consumerSearch.service';
import { ConsumerSearchAggregateService } from '@/modules/consumer/applications/services/search/consumerSearchAggregate.service';
import { ConsumerSearchIndexRegisterService } from '@/modules/consumer/applications/services/search/consumerSearchIndexRegister.service';
import { ConsumerSearchSyncService } from '@/modules/consumer/applications/services/search/consumerSearchSync.service';
import { UpdateConsumerService } from '@/modules/consumer/applications/services/updateConsumer.service';
import { ConsumerExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumerExistenceValidator.service';
import { ConsumerNameAvailableValidatorService } from '@/modules/consumer/applications/services/validators/consumerNameAvailableValidator.service';
import { ConsumersExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumersExistenceValidator.service';
import { ConsumerUniqueNameValidatorService } from '@/modules/consumer/applications/services/validators/consumerUniqueNameValidator.service';
import { ConsumerElasticsearchIndex } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearch.index';
import { ConsumerElasticsearchQuery } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearch.query';
import { ConsumerElasticsearchDeleteQuery } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearchDelete.query';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { ConsumerController } from '@/modules/consumer/interfaces/controllers/v1.controller';
import { OutboxModule } from '@/modules/outbox/outbox.module';

@Module({
    imports: [CqrsModule, AuthenticationModule, ElasticsearchModule, OutboxModule],
    controllers: [ConsumerController],
    providers: [
        CreateConsumerService,
        DeleteConsumerService,
        UpdateConsumerService,
        FindConsumerByUserIdAndIdOrNullHandler,
        FindConsumerByUserIdAndIdOrThrowHandler,
        FindConsumerListByUserIdHandler,
        FindManyConsumersByUserIdAndIdsHandler,
        ExistsConsumerByUserIdAndIdsHandler,
        ExistsConsumerByUserIdAndIdHandler,
        ExistsConsumerByUserIdAndNameHandler,
        DeleteConsumerHandler,
        UpdateConsumerHandler,
        FindConsumerByUserIdAndNameOrNullHandler,
        FindTotalConsumersByUserIdHandler,
        FindConsumerListAndTotalByUserIdService,
        FindConsumerListByUserIdService,
        ConsumerService,
        DeleteManyBillsConsumersHandler,
        CreateConsumerHandler,
        CreateManyBillsConsumersHandler,
        FindManyBillConsumerTargetsByRefIdsHandler,
        ExistsConsumerByUserIdAndExcludingIdAndNameHandler,
        FindManyBillsConsumersByRefIdHandler,
        CreatedConsumerMessageElasticsearchHandler,
        UpdatedConsumerMessageElasticsearchHandler,
        DeletedConsumerMessageElasticsearchHandler,
        DeletedUserMessageElasticsearchHandler,
        ConsumerRepository,
        BillConsumerRepository,
        ConsumerElasticsearchIndex,
        ConsumerElasticsearchQuery,
        ConsumerElasticsearchDeleteQuery,
        ConsumerSearchService,
        ConsumerSearchAggregateService,
        ConsumerSearchIndexRegisterService,
        ConsumerExistenceValidatorService,
        ConsumersExistenceValidatorService,
        ConsumerUniqueNameValidatorService,
        ConsumerNameAvailableValidatorService,
        ConsumerSearchSyncService,
    ],
    exports: [
        ConsumerSearchService,
        ConsumerSearchAggregateService,
        ConsumersExistenceValidatorService,
        ConsumerSearchSyncService,
    ],
})
export class ConsumerModule {}
