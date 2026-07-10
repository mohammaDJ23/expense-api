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
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { CreateBillService } from '@/modules/bill/applications/services/createBill.service';
import { DeleteBillService } from '@/modules/bill/applications/services/deleteBill.service';
import { FindBillByUserIdAndIdOrThrowService } from '@/modules/bill/applications/services/findBillByUserIdAndIdOrThrow.service';
import { FindBillListByUserIdService } from '@/modules/bill/applications/services/findBillListByUserId.service';
import { UpdateBillService } from '@/modules/bill/applications/services/updateBill.service';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';
import { BillController } from '@/modules/bill/interface/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule, ElasticsearchModule],
    providers: [
        BillService,
        CreateBillService,
        UpdateBillService,
        DeleteBillService,
        FindBillByUserIdAndIdOrThrowService,
        FindBillListByUserIdService,
        FindBillByUserIdAndIdOrThrowHandler,
        FindBillListByUserIdHandler,
        ExistsBillByUserIdAndIdHandler,
        CreateBillMessageHandler,
        CreateBillMessageElasticsearchProcessor,
        UpdateBillMessageHandler,
        UpdateBillMessageElasticsearchProcessor,
        DeleteBillMessageHandler,
        DeleteBillMessageElasticsearchProcessor,
        CreateBillHandler,
        UpdateBillHandler,
        DeleteBillHandler,
        BillRepository,
    ],
    controllers: [BillController],
})
export class BillModule {}
