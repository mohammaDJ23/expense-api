import { Module, type MiddlewareConsumer, type NestModule } from '@nestjs/common';

import { CookieParserMiddleware } from './cookeParser.middleware';

@Module({})
export class CookieParserModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CookieParserMiddleware).forRoutes('*');
    }
}
