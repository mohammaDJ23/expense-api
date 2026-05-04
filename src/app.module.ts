import { Module } from '@nestjs/common';

import { CommonModule } from '@/common/infrastructure/common.module';
import { HealthModule } from '@/modules/health/health.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [CommonModule, HealthModule, UserModule],
})
export class AppModule {}
