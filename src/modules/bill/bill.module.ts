import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateBillHandler } from '@/modules/bill/applications/commands/createBill/createBill.handler';
import { DeleteBillHandler } from '@/modules/bill/applications/commands/deleteBill/deleteBill.handler';
import { UpdateBillHandler } from '@/modules/bill/applications/commands/updateBill/updateBill.handler';
import { FindBillByUserIdAndIdOrThrowHandler } from '@/modules/bill/applications/queries/findBillByUserIdAndIdOrThrow/findBillByUserIdAndIdOrThrow.handler';
import { FindBillListByUserIdHandler } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.handler';
import { IsBillExistsByUserIdAndIdHandler } from '@/modules/bill/applications/queries/isBillExistsByUserIdAndId/isBillExistsByUserIdAndId.handler';
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { CreateBillService } from '@/modules/bill/applications/services/createBill.service';
import { DeleteBillService } from '@/modules/bill/applications/services/deleteBill.service';
import { FindBillByUserIdAndIdOrThrowService } from '@/modules/bill/applications/services/findBillByUserIdAndIdOrThrow.service';
import { FindBillListByUserIdService } from '@/modules/bill/applications/services/findBillListByUserId.service';
import { UpdateBillService } from '@/modules/bill/applications/services/updateBill.service';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';
import { BillController } from '@/modules/bill/interface/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule],
    providers: [
        BillService,
        CreateBillService,
        UpdateBillService,
        DeleteBillService,
        FindBillByUserIdAndIdOrThrowService,
        FindBillListByUserIdService,
        FindBillByUserIdAndIdOrThrowHandler,
        FindBillListByUserIdHandler,
        IsBillExistsByUserIdAndIdHandler,
        CreateBillHandler,
        UpdateBillHandler,
        DeleteBillHandler,
        BillRepository,
    ],
    controllers: [BillController],
})
export class BillModule {}
