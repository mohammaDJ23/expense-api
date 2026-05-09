import { Module } from '@nestjs/common';

import { InfrastructureModule } from '@/infrastructure/infrastructure.module';
import { AuthenticationModule } from '@/modules/authentication/authentication.module';
import { HealthModule } from '@/modules/health/health.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [InfrastructureModule, HealthModule, AuthenticationModule, UserModule],
})
export class AppModule {}
