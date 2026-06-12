import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateBillHandler } from '@/modules/bill/applications/commands/createBill/createBill.handler';
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';
import { BillController } from '@/modules/bill/interface/controllers/v1.controller';
import { ConsumerModule } from '@/modules/consumer/consumer.module';
import { LocationModule } from '@/modules/location/location.module';
import { ReceiverModule } from '@/modules/receiver/receiver.module';

@Module({
    imports: [CqrsModule, ConsumerModule, LocationModule, ReceiverModule, AuthenticationModule],
    providers: [BillService, CreateBillHandler, BillRepository],
    controllers: [BillController],
})
export class BillModule {}
