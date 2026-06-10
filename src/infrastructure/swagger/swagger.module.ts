import { Module } from '@nestjs/common';

import { CoreModule } from '@/core/core.module';

import { SwaggerService } from './swagger.service';

@Module({
    imports: [CoreModule],
    providers: [SwaggerService],
})
export class SwaggerModule {}
