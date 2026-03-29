import { Module } from '@nestjs/common';

import { VersionModule } from '@/common/infrastructure/version/version.module';

import { SwaggerService } from './swagger.service';

@Module({
    imports: [VersionModule],
    providers: [SwaggerService],
})
export class SwaggerModule {}
