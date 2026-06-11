import { Module } from '@nestjs/common';

import { CoreModule } from '@/core/core.module';
import { InfrastructureModule } from '@/infrastructure/infrastructure.module';
import { AuthenticationModule } from '@/modules/authentication/authentication.module';
import { ConsumerModule } from '@/modules/consumer/consumer.module';
import { HealthModule } from '@/modules/health/health.module';
import { LocationModule } from '@/modules/location/location.module';
import { ReceiverModule } from '@/modules/receiver/location.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [
        InfrastructureModule,
        CoreModule,
        HealthModule,
        AuthenticationModule,
        UserModule,
        ConsumerModule,
        LocationModule,
        ReceiverModule,
    ],
})
export class AppModule {}
