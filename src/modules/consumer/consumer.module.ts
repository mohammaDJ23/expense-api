import { Module } from '@nestjs/common';

import { CacheModule } from '@/core/features/cache/cache.module';
import { JWTModule } from '@/core/features/jwt/jwt.module';
import { CursorPaginationModule } from '@/core/features/pagination/cursor/cursorPagination.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { CreateConsumerHandler } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.handler';
import { CreateManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.handler';
import { DeleteConsumerHandler } from '@/modules/consumer/applications/commands/deleteConsumer/deleteConsumer.handler';
import { DeleteManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/deleteManyBillsConsumers/deleteManyBillsConsumers.handler';
import { UpdateConsumerHandler } from '@/modules/consumer/applications/commands/updateConsumer/updateConsumer.handler';
import { ConsumerCacheInvalidatorProcessor } from '@/modules/consumer/applications/messages/consumerCacheInvalidator.processor';
import { ConsumerElasticsearchIndexerProcessor } from '@/modules/consumer/applications/messages/consumerElasticsearchIIndexer.processor';
import { CreatedConsumerCacheInvalidatorHandler } from '@/modules/consumer/applications/messages/createdConsumer/createdConsumerCacheInvalidator.handler';
import { CreatedConsumerElasticsearchIndexerHandler } from '@/modules/consumer/applications/messages/createdConsumer/createdConsumerElasticsearchIndexer.handler';
import { DeletedConsumerCacheInvalidatorHandler } from '@/modules/consumer/applications/messages/deletedConsumer/deletedConsumerCacheInvalidator.handler';
import { DeletedConsumerElasticsearchRemoverHandler } from '@/modules/consumer/applications/messages/deletedConsumer/deletedConsumerElasticsearchRemover.handler';
import { DeletedUserConsumerCacheInvalidatorHandler } from '@/modules/consumer/applications/messages/deletedUser/deletedUserConsumerCacheInvalidator.handler';
import { DeletedUserConsumerElasticsearchRemoverHandler } from '@/modules/consumer/applications/messages/deletedUser/deletedUserConsumerElasticsearchRemover.handler';
import { UpdatedConsumerCacheInvalidatorHandler } from '@/modules/consumer/applications/messages/updatedConsumer/updatedConsumerCacheInvalidator.handler';
import { UpdatedConsumerElasticsearchRemoverHandler } from '@/modules/consumer/applications/messages/updatedConsumer/updatedConsumerElasticsearchRemover.handler';
import { ConsumerListCursorPaginationDefinition } from '@/modules/consumer/applications/pagination/cursor/consumerListCursorPagination.definition';
import { ExistsConsumerByUserIdAndExcludingIdAndNameHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndExcludingIdAndName/existsConsumerByUserIdAndExcludingIdAndName.handler';
import { ExistsConsumerByUserIdAndIdHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndId/existsConsumerByUserIdAndId.handler';
import { ExistsConsumerByUserIdAndIdsHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndIds/existsConsumerByUserIdAndIds.handler';
import { ExistsConsumerByUserIdAndNameHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndName/existsConsumerByUserIdAndName.handler';
import { FindConsumerByUserIdAndIdOrThrowHandler } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndIdOrThrow/findConsumerByUserIdAndIdOrThrow.handler';
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
import { DeleteConsumersElasticsearchQuery } from '@/modules/consumer/infrastructure/elasticsearch/deleteConsumersElasticsearch.query';
import { FindConsumerListElasticsearchQuery } from '@/modules/consumer/infrastructure/elasticsearch/findConsumerListElasticsearch.query';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { ConsumerController } from '@/modules/consumer/interfaces/controllers/v1.controller';
import { OutboxModule } from '@/modules/outbox/outbox.module';

@Module({
    imports: [
        CqrsModule,
        ElasticsearchModule,
        OutboxModule,
        QueryDispatcherModule,
        CacheModule,
        CursorPaginationModule,
        JWTModule,
    ],
    controllers: [ConsumerController],
    providers: [
        CreateConsumerService,
        DeleteConsumerService,
        UpdateConsumerService,
        FindConsumerByUserIdAndIdOrThrowHandler,
        FindConsumerListByUserIdHandler,
        FindManyConsumersByUserIdAndIdsHandler,
        ExistsConsumerByUserIdAndIdsHandler,
        ExistsConsumerByUserIdAndIdHandler,
        ExistsConsumerByUserIdAndNameHandler,
        DeleteConsumerHandler,
        UpdateConsumerHandler,
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
        CreatedConsumerElasticsearchIndexerHandler,
        UpdatedConsumerElasticsearchRemoverHandler,
        DeletedConsumerElasticsearchRemoverHandler,
        DeletedUserConsumerElasticsearchRemoverHandler,
        ConsumerRepository,
        BillConsumerRepository,
        ConsumerElasticsearchIndex,
        FindConsumerListElasticsearchQuery,
        DeleteConsumersElasticsearchQuery,
        ConsumerSearchService,
        ConsumerSearchAggregateService,
        ConsumerSearchIndexRegisterService,
        ConsumerExistenceValidatorService,
        ConsumersExistenceValidatorService,
        ConsumerUniqueNameValidatorService,
        ConsumerNameAvailableValidatorService,
        ConsumerSearchSyncService,
        ConsumerElasticsearchIndexerProcessor,
        CreatedConsumerCacheInvalidatorHandler,
        DeletedConsumerCacheInvalidatorHandler,
        DeletedUserConsumerCacheInvalidatorHandler,
        UpdatedConsumerCacheInvalidatorHandler,
        ConsumerCacheInvalidatorProcessor,
        ConsumerListCursorPaginationDefinition,
    ],
    exports: [
        ConsumerSearchService,
        ConsumerSearchAggregateService,
        ConsumersExistenceValidatorService,
        ConsumerSearchSyncService,
    ],
})
export class ConsumerModule {}
