import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ExceptionNormalizerModule } from '@/core/exceptions/normalizer/exceptionNormalizer.module';

import { GlobalFilter } from './global.filter';
import { GlobalFallbackHostStrategy } from './globalFallbackHost.strategy';
import { GlobalHttpHostStrategy } from './globalHttpHost.strategy';

@Module({
    imports: [ExceptionNormalizerModule],
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
