import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ExceptionFilter } from './exception.filter';
import { FallbackHostHandler } from './fallbackHost.handler';
import { HttpHostHandler } from './httpHost.handler';

@Global()
@Module({
    providers: [
        HttpHostHandler,
        FallbackHostHandler,
        {
            provide: APP_FILTER,
            useClass: ExceptionFilter,
        },
    ],
})
export class ExceptionModule {}
