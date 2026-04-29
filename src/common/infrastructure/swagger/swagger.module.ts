import { Module } from '@nestjs/common';

import { AppInstanceModule } from '@/common/infrastructure/appInstance/appInstance.module';
import { VersionModule } from '@/common/infrastructure/version/version.module';

import { SwaggerService } from './swagger.service';

@Module({
    imports: [VersionModule, AppInstanceModule],
    providers: [SwaggerService],
})
export class SwaggerModule {}
