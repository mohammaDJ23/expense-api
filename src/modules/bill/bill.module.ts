import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateBillHandler } from '@/modules/bill/applications/commands/createBill/createBill.handler';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

@Module({
    imports: [CqrsModule],
    providers: [CreateBillHandler, BillRepository],
})
export class BillModule {}
