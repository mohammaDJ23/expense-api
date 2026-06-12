import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateBillHandler } from '@/modules/bill/applications/commands/createBill/createBill.handler';
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';
import { ConsumerModule } from '@/modules/consumer/consumer.module';
import { LocationModule } from '@/modules/location/location.module';
import { ReceiverModule } from '@/modules/receiver/receiver.module';

@Module({
    imports: [CqrsModule, ConsumerModule, LocationModule, ReceiverModule],
    providers: [BillService, CreateBillHandler, BillRepository],
})
export class BillModule {}
