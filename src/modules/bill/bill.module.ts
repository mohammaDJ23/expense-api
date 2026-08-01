import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { CreateBillHandler } from '@/modules/bill/applications/commands/createBill/createBill.handler';
import { DeleteBillHandler } from '@/modules/bill/applications/commands/deleteBill/deleteBill.handler';
import { UpdateBillHandler } from '@/modules/bill/applications/commands/updateBill/updateBill.handler';
import { CreateBillMessageHandler } from '@/modules/bill/applications/messages/createBill/createBillMessage.handler';
import { CreateBillMessageElasticsearchProcessor } from '@/modules/bill/applications/messages/createBill/createBillMessageElasticsearch.processor';
import { DeleteBillMessageHandler } from '@/modules/bill/applications/messages/deleteBill/deleteBillMessage.handler';
import { DeleteBillMessageElasticsearchProcessor } from '@/modules/bill/applications/messages/deleteBill/deleteBillMessageElasticsearch.processor';
import { UpdateBillMessageHandler } from '@/modules/bill/applications/messages/updateBill/updateBillMessage.handler';
import { UpdateBillMessageElasticsearchProcessor } from '@/modules/bill/applications/messages/updateBill/updateBillMessageElasticsearch.processor';
import { ExistsBillByUserIdAndIdHandler } from '@/modules/bill/applications/queries/existsBillByUserIdAndId/existsBillByUserIdAndId.handler';
import { FindBillByUserIdAndIdOrThrowHandler } from '@/modules/bill/applications/queries/findBillByUserIdAndIdOrThrow/findBillByUserIdAndIdOrThrow.handler';
import { FindBillListByUserIdHandler } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.handler';
import { FindBillsPeriodByPurchasedAtHandler } from '@/modules/bill/applications/queries/findBillsPeriodByPurchasedAt/findBillsPeriodByPurchasedAt.handler';
import { FindManyBillsByUserIdAndIdsHandler } from '@/modules/bill/applications/queries/findManyBillsByUserIdAndIds/findManyBillsByUserIdAndIds.handler';
import { FindMostUsedConsumersHandler } from '@/modules/bill/applications/queries/findMostUsedConsumers/findMostUsedConsumers.handler';
import { FindMostUsedLocationsHandler } from '@/modules/bill/applications/queries/findMostUsedLocations/findMostUsedLocations.handler';
import { FindMostUsedReceiversHandler } from '@/modules/bill/applications/queries/findMostUsedReceivers/findMostUsedReceivers.handler';
import { FindTotalBillsByUserIdHandler } from '@/modules/bill/applications/queries/findTotalBillsByUserId/findTotalBillsByUserId.handler';
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { CreateBillService } from '@/modules/bill/applications/services/createBill.service';
import { DeleteBillService } from '@/modules/bill/applications/services/deleteBill.service';
import { FindBillByUserIdAndIdOrThrowService } from '@/modules/bill/applications/services/findBillByUserIdAndIdOrThrow.service';
import { FindBillListByUserIdService } from '@/modules/bill/applications/services/findBillListByUserId.service';
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
import { CreateBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/createBillsConsumersSynchronization.service';
import { DeleteBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/deleteBillsConsumersSynchronization.service';
import { UpdateBillService } from '@/modules/bill/applications/services/updateBill.service';
import { BillExistenceValidatorService } from '@/modules/bill/applications/services/validators/billExistenceValidator.service';
import { BillElasticsearchIndex } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.index';
import { BillElasticsearchQuery } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.query';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';
import { BillController } from '@/modules/bill/interface/controllers/v1.controller';
import { ConsumerModule } from '@/modules/consumer/consumer.module';
import { LocationModule } from '@/modules/location/location.module';
import { OutboxModule } from '@/modules/outbox/outbox.module';
import { ReceiverModule } from '@/modules/receiver/receiver.module';

@Module({
    imports: [
        CqrsModule,
        AuthenticationModule,
        ElasticsearchModule,
        LocationModule,
        ConsumerModule,
        ReceiverModule,
        OutboxModule,
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
        FindBillByUserIdAndIdOrThrowHandler,
        FindBillListByUserIdHandler,
        ExistsBillByUserIdAndIdHandler,
        CreateBillMessageHandler,
        FindManyBillsByUserIdAndIdsHandler,
        FindTotalBillsByUserIdHandler,
        FindMostUsedLocationsHandler,
        FindMostUsedReceiversHandler,
        FindMostUsedConsumersHandler,
        FindBillsPeriodByPurchasedAtHandler,
        CreateBillMessageElasticsearchProcessor,
        UpdateBillMessageHandler,
        UpdateBillMessageElasticsearchProcessor,
        DeleteBillMessageHandler,
        DeleteBillMessageElasticsearchProcessor,
        CreateBillHandler,
        UpdateBillHandler,
        DeleteBillHandler,
        BillRepository,
        BillElasticsearchIndex,
        BillElasticsearchQuery,
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
    ],
    controllers: [BillController],
    exports: [BillSearchService, BillSearchAggregateService],
})
export class BillModule {}
