import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { GlobalFilter } from './global.filter';
import { GlobalFallbackHostStrategy } from './globalFallbackHost.strategy';
import { GlobalHttpHostStrategy } from './globalHttpHost.strategy';

@Module({
    providers: [
        GlobalHttpHostStrategy,
        GlobalFallbackHostStrategy,
        {
            provide: APP_FILTER,
            useClass: GlobalFilter,
        },
    ],
})
export class FilterModule {}
