import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/features/authentication/authentication.module';
import { CacheModule } from '@/core/features/cache/cache.module';
import { ExcelModule } from '@/core/features/export/excel/excel.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { CreateBillHandler } from '@/modules/bill/applications/commands/createBill/createBill.handler';
import { DeleteBillHandler } from '@/modules/bill/applications/commands/deleteBill/deleteBill.handler';
import { UpdateBillHandler } from '@/modules/bill/applications/commands/updateBill/updateBill.handler';
import { BillCacheInvalidatorProcessor } from '@/modules/bill/applications/messages/billCacheInvalidator.processor';
import { CreatedBillCacheInvalidatorHandler } from '@/modules/bill/applications/messages/createdBill/createdBillCacheInvalidator.handler';
import { CreatedBillMessageElasticsearchHandler } from '@/modules/bill/applications/messages/createdBill/createdBillMessageElasticsearch.handler';
import { DeletedBillCacheInvalidatorHandler } from '@/modules/bill/applications/messages/deletedBill/deletedBillCacheInvalidator.handler';
import { DeletedBillMessageElasticsearchHandler } from '@/modules/bill/applications/messages/deletedBill/deletedBillMessageElasticsearch.handler';
import { DeletedUserBillCacheInvalidatorHandler } from '@/modules/bill/applications/messages/deletedUser/deletedUserBillCacheInvalidator.handler';
import { DeletedUserMessageElasticsearchHandler } from '@/modules/bill/applications/messages/deletedUser/deletedUserMessageElasticsearch.handler';
import { UpdatedBillCacheInvalidatorHandler } from '@/modules/bill/applications/messages/updatedBill/updatedBillCacheInvalidator.handler';
import { UpdatedBillMessageElasticsearchHandler } from '@/modules/bill/applications/messages/updatedBill/updatedBillMessageElasticsearch.handler';
import { ExistsBillByUserIdAndIdHandler } from '@/modules/bill/applications/queries/existsBillByUserIdAndId/existsBillByUserIdAndId.handler';
import { FindBillByUserIdAndIdOrThrowHandler } from '@/modules/bill/applications/queries/findBillByUserIdAndIdOrThrow/findBillByUserIdAndIdOrThrow.handler';
import { FindBillListByUserIdHandler } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.handler';
import { FindBillsPeriodByPurchasedAtHandler } from '@/modules/bill/applications/queries/findBillsPeriodByPurchasedAt/findBillsPeriodByPurchasedAt.handler';
import { FindBillsTimelineByPurchasedAtHandler } from '@/modules/bill/applications/queries/findBillsTimelineByPurchasedAt/findBillsTimelineByPurchasedAt.handler';
import { FindManyBillsByUserIdAndIdsHandler } from '@/modules/bill/applications/queries/findManyBillsByUserIdAndIds/findManyBillsByUserIdAndIds.handler';
import { FindMostUsedConsumersHandler } from '@/modules/bill/applications/queries/findMostUsedConsumers/findMostUsedConsumers.handler';
import { FindMostUsedLocationsHandler } from '@/modules/bill/applications/queries/findMostUsedLocations/findMostUsedLocations.handler';
import { FindMostUsedReceiversHandler } from '@/modules/bill/applications/queries/findMostUsedReceivers/findMostUsedReceivers.handler';
import { FindTotalBillsByUserIdHandler } from '@/modules/bill/applications/queries/findTotalBillsByUserId/findTotalBillsByUserId.handler';
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { CreateBillService } from '@/modules/bill/applications/services/createBill.service';
import { DeleteBillService } from '@/modules/bill/applications/services/deleteBill.service';
import { BillsExportJob } from '@/modules/bill/applications/services/export/billsExport.job';
import { BillsExportDataLoaderService } from '@/modules/bill/applications/services/export/billsExportDataLoader.service';
import { BillsExportMailerService } from '@/modules/bill/applications/services/export/billsExportMailer.service';
import { BillsExcelExportService } from '@/modules/bill/applications/services/export/excel/billsExcelExport.service';
import { BillsExcelExportGeneratorService } from '@/modules/bill/applications/services/export/excel/billsExcelExportGenerator.service';
import { FindBillByUserIdAndIdOrThrowService } from '@/modules/bill/applications/services/findBillByUserIdAndIdOrThrow.service';
import { FindBillListAndTotalByUserIdService } from '@/modules/bill/applications/services/findBillListAndTotalByUserId.service';
import { FindBillListByUserIdService } from '@/modules/bill/applications/services/findBillListByUserId.service';
import { FindBillsTimelineByPurchasedAtService } from '@/modules/bill/applications/services/findBillsTimelineByPurchasedAt.service';
import { BillAssemblerService } from '@/modules/bill/applications/services/relations/billAssembler.service';
import { BillConsumerTargetsRelationLoaderService } from '@/modules/bill/applications/services/relations/billConsumerTargetsRelationLoader.service';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';
import { BillsConsumersRelationLoaderService } from '@/modules/bill/applications/services/relations/billsConsumersRelationLoader.service';
import { ConsumersRelationLoaderService } from '@/modules/bill/applications/services/relations/consumersRelationLoader.service';
import { LocationRelationLoaderService } from '@/modules/bill/applications/services/relations/locationRelationLoader.service';
import { LocationsRelationLoaderService } from '@/modules/bill/applications/services/relations/locationsRelationLoader.service';
import { MostUsedConsumersService } from '@/modules/bill/applications/services/relations/mostUsedConsumers.service';
import { MostUsedLocationsService } from '@/modules/bill/applications/services/relations/mostUsedLocations.service';
import { MostUsedReceiversService } from '@/modules/bill/applications/services/relations/mostUsedReceivers.service';
import { ReceiverRelationLoaderService } from '@/modules/bill/applications/services/relations/receiverRelationLoader.service';
import { ReceiversRelationLoaderService } from '@/modules/bill/applications/services/relations/receiversRelationLoader.service';
import { BillSearchService } from '@/modules/bill/applications/services/search/billSearch.service';
import { BillSearchAggregateService } from '@/modules/bill/applications/services/search/billSearchAggregate.service';
import { BillSearchIndexRegisterService } from '@/modules/bill/applications/services/search/billSearchIndexRegister.service';
import { BillSearchSyncService } from '@/modules/bill/applications/services/search/billSearchSync.service';
import { CreateBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/createBillsConsumersSynchronization.service';
import { DeleteBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/deleteBillsConsumersSynchronization.service';
import { UpdateBillService } from '@/modules/bill/applications/services/updateBill.service';
import { BillExistenceValidatorService } from '@/modules/bill/applications/services/validators/billExistenceValidator.service';
import { BillElasticsearchIndex } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.index';
import { BillElasticsearchQuery } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.query';
import { BillElasticsearchDeleteQuery } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearchDelete.query';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';
import { BillController } from '@/modules/bill/interface/controllers/v1.controller';
import { ConsumerModule } from '@/modules/consumer/consumer.module';
import { LocationModule } from '@/modules/location/location.module';
import { OutboxModule } from '@/modules/outbox/outbox.module';
import { ReceiverModule } from '@/modules/receiver/receiver.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [
        CqrsModule,
        AuthenticationModule,
        ElasticsearchModule,
        LocationModule,
        ConsumerModule,
        ReceiverModule,
        OutboxModule,
        UserModule,
        ExcelModule,
        QueryDispatcherModule,
        CacheModule,
    ],
    providers: [
        BillService,
        CreateBillService,
        UpdateBillService,
        DeleteBillService,
        BillAssemblerService,
        BillsAssemblerService,
        FindBillByUserIdAndIdOrThrowService,
        FindBillListByUserIdService,
        FindBillListAndTotalByUserIdService,
        FindBillByUserIdAndIdOrThrowHandler,
        FindBillListByUserIdHandler,
        ExistsBillByUserIdAndIdHandler,
        FindManyBillsByUserIdAndIdsHandler,
        FindTotalBillsByUserIdHandler,
        FindMostUsedLocationsHandler,
        FindMostUsedReceiversHandler,
        FindMostUsedConsumersHandler,
        FindBillsPeriodByPurchasedAtHandler,
        FindBillsTimelineByPurchasedAtHandler,
        CreatedBillMessageElasticsearchHandler,
        UpdatedBillMessageElasticsearchHandler,
        DeletedBillMessageElasticsearchHandler,
        DeletedUserMessageElasticsearchHandler,
        CreateBillHandler,
        UpdateBillHandler,
        DeleteBillHandler,
        BillRepository,
        BillElasticsearchIndex,
        BillElasticsearchQuery,
        BillElasticsearchDeleteQuery,
        BillSearchService,
        BillSearchAggregateService,
        BillSearchIndexRegisterService,
        ConsumersRelationLoaderService,
        LocationRelationLoaderService,
        ReceiverRelationLoaderService,
        BillExistenceValidatorService,
        LocationsRelationLoaderService,
        ReceiversRelationLoaderService,
        BillConsumerTargetsRelationLoaderService,
        CreateBillsConsumersSynchronizationService,
        DeleteBillsConsumersSynchronizationService,
        BillsConsumersRelationLoaderService,
        MostUsedReceiversService,
        MostUsedLocationsService,
        MostUsedConsumersService,
        FindBillsTimelineByPurchasedAtService,
        BillsExportDataLoaderService,
        BillsExcelExportGeneratorService,
        BillsExcelExportService,
        BillsExportJob,
        BillsExportMailerService,
        BillSearchSyncService,
        CreatedBillCacheInvalidatorHandler,
        DeletedBillCacheInvalidatorHandler,
        DeletedUserBillCacheInvalidatorHandler,
        UpdatedBillCacheInvalidatorHandler,
        BillCacheInvalidatorProcessor,
    ],
    controllers: [BillController],
    exports: [BillSearchService, BillSearchAggregateService, BillSearchSyncService],
})
export class BillModule {}
