import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ExceptionFilter } from './exception.filter';
import { FallbackExceptionExtractor } from './fallbackException.extractor';
import { FallbackHostHandler } from './fallbackHost.handler';
import { HttpExceptionExtractor } from './httpException.extractor';
import { HttpHostHandler } from './httpHost.handler';
import { StandardExceptionExtractor } from './standardException.extractor';

@Global()
@Module({
    providers: [
        HttpExceptionExtractor,
        StandardExceptionExtractor,
        FallbackExceptionExtractor,

        HttpHostHandler,
        FallbackHostHandler,

        {
            provide: APP_FILTER,
            useClass: ExceptionFilter,
        },
    ],
})
export class ExceptionModule {}
