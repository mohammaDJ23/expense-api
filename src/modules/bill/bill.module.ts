import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateBillHandler } from '@/modules/bill/applications/commands/createBill/createBill.handler';
import { GetBillByIdOrThrowHandler } from '@/modules/bill/applications/queries/getBillByIdOrThrow/getBillByIdOrThrow.handler';
import { GetManyBillsHandler } from '@/modules/bill/applications/queries/getManyBills/getManyBills.handler';
import { CreateBillService } from '@/modules/bill/applications/services/createBill.service';
import { GetBillByIdOrThrowService } from '@/modules/bill/applications/services/getBillByIdOrThrow.service';
import { GetManyBillsService } from '@/modules/bill/applications/services/getManyBills.service';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';
import { BillController } from '@/modules/bill/interface/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule],
    providers: [
        CreateBillService,
        GetManyBillsService,
        GetBillByIdOrThrowService,
        GetBillByIdOrThrowHandler,
        CreateBillHandler,
        GetManyBillsHandler,
        BillRepository,
    ],
    controllers: [BillController],
})
export class BillModule {}
