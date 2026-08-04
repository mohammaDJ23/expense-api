import { Module } from '@nestjs/common';

import { CoreModule } from '@/core/core.module';
import { InfrastructureModule } from '@/infrastructure/infrastructure.module';
import { AuthenticationModule } from '@/modules/authentication/authentication.module';
import { BillModule } from '@/modules/bill/bill.module';
import { ConsumerModule } from '@/modules/consumer/consumer.module';
import { HealthModule } from '@/modules/health/health.module';
import { LocationModule } from '@/modules/location/location.module';
import { OutboxModule } from '@/modules/outbox/outbox.module';
import { ReceiverModule } from '@/modules/receiver/receiver.module';
import { SearchModule } from '@/modules/search/search.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [
        InfrastructureModule,
        CoreModule,
        HealthModule,
        AuthenticationModule,
        BillModule,
        UserModule,
        ConsumerModule,
        LocationModule,
        ReceiverModule,
        OutboxModule,
        SearchModule,
    ],
})
export class AppModule {}
