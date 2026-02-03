import { Module } from '@nestjs/common';

import { CommonModule } from './common/infrastructure/common.module';
import { HealthModule } from './modules/health/health.module';

@Module({
    imports: [CommonModule, HealthModule],
})
export class AppModule {}
