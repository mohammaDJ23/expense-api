import { Module } from '@nestjs/common';

import { AppInstanceModule } from '@/infrastructure/appInstance/appInstance.module';
import { VersionModule } from '@/infrastructure/version/version.module';

import { SwaggerService } from './swagger.service';

@Module({
    imports: [VersionModule, AppInstanceModule],
    providers: [SwaggerService],
})
export class SwaggerModule {}
