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
import { FindManyBillsByUserIdAndIdsHandler } from '@/modules/bill/applications/queries/findManyBillsByUserIdAndIds/findManyBillsByUserIdAndIds.handler';
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { CreateBillService } from '@/modules/bill/applications/services/createBill.service';
import { DeleteBillService } from '@/modules/bill/applications/services/deleteBill.service';
import { FindBillByUserIdAndIdOrThrowService } from '@/modules/bill/applications/services/findBillByUserIdAndIdOrThrow.service';
import { FindBillListByUserIdService } from '@/modules/bill/applications/services/findBillListByUserId.service';
import { FindManyBillsByUserIdAndIdsService } from '@/modules/bill/applications/services/findManyBillsByUserIdAndIds.service';
import { BillAssemblerService } from '@/modules/bill/applications/services/relations/billAssembler.service';
import { BillConsumersRelationLoaderService } from '@/modules/bill/applications/services/relations/billConsumersRelationLoader.service';
import { BillLocationRelationLoaderService } from '@/modules/bill/applications/services/relations/billLocationRelationLoader.service';
import { BillLocationsRelationLoaderService } from '@/modules/bill/applications/services/relations/billLocationsRelationLoader.service';
import { BillReceiverRelationLoaderService } from '@/modules/bill/applications/services/relations/billReceiverRelationLoader.service';
import { BillReceiversRelationLoaderService } from '@/modules/bill/applications/services/relations/billReceiversRelationLoader.service';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';
import { BillSearchService } from '@/modules/bill/applications/services/search/billSearch.service';
import { BillSearchAggregateService } from '@/modules/bill/applications/services/search/billSearchAggregate.service';
import { BillSearchIndexRegisterService } from '@/modules/bill/applications/services/search/billSearchIndexRegister.service';
import { UpdateBillService } from '@/modules/bill/applications/services/updateBill.service';
import { BillExistenceValidatorService } from '@/modules/bill/applications/services/validators/billExistenceValidator.service';
import { BillElasticsearchIndex } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.index';
import { BillElasticsearchQuery } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearch.query';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';
import { BillController } from '@/modules/bill/interface/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule, ElasticsearchModule],
    providers: [
        BillService,
        CreateBillService,
        UpdateBillService,
        DeleteBillService,
        BillAssemblerService,
        BillsAssemblerService,
        FindManyBillsByUserIdAndIdsService,
        FindBillByUserIdAndIdOrThrowService,
        FindBillListByUserIdService,
        FindBillByUserIdAndIdOrThrowHandler,
        FindBillListByUserIdHandler,
        ExistsBillByUserIdAndIdHandler,
        CreateBillMessageHandler,
        FindManyBillsByUserIdAndIdsHandler,
        CreateBillMessageElasticsearchProcessor,
        UpdateBillMessageHandler,
        UpdateBillMessageElasticsearchProcessor,
        DeleteBillMessageHandler,
        DeleteBillMessageElasticsearchProcessor,
        CreateBillHandler,
        UpdateBillHandler,
        DeleteBillHandler,
        BillRepository,
        FindManyBillsByUserIdAndIdsService,
        BillElasticsearchIndex,
        BillElasticsearchQuery,
        BillSearchService,
        BillSearchAggregateService,
        BillSearchIndexRegisterService,
        BillConsumersRelationLoaderService,
        BillLocationRelationLoaderService,
        BillReceiverRelationLoaderService,
        BillExistenceValidatorService,
        BillLocationsRelationLoaderService,
        BillReceiversRelationLoaderService,
    ],
    controllers: [BillController],
    exports: [BillSearchService, BillSearchAggregateService],
})
export class BillModule {}
