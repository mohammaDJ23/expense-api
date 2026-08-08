import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ExceptionNormalizerModule } from '@/core/features/exceptionNormalizer/exceptionNormalizer.module';

import { GlobalFilter } from './globalFilter';
import { GlobalFilterFallbackHostStrategy } from './globalFilterFallbackHost.strategy';
import { GlobalFilterHttpHostStrategy } from './globalFilterHttpHost.strategy';

@Module({
    imports: [ExceptionNormalizerModule],
    providers: [
        GlobalFilterHttpHostStrategy,
        GlobalFilterFallbackHostStrategy,
        {
            provide: APP_FILTER,
            useClass: GlobalFilter,
        },
    ],
})
export class GlobalFilterModule {}
