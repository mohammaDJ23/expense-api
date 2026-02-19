import { DynamicModule, Module } from '@nestjs/common';

import { SwaggerService } from './swagger.service';

@Module({})
export class SwaggerModule {
    static forRoot(): DynamicModule {
        return {
            module: SwaggerModule,
            providers: [SwaggerService],
        };
    }
}
