import { Module } from '@nestjs/common';

import { AppInstanceModule } from '@/common/infrastructure/appInstance/appInstance.module';

import { ApiVersioningService } from './apiVersioning.service';

@Module({
    imports: [AppInstanceModule],
    providers: [ApiVersioningService],
})
export class ApiVersioningModule {}
