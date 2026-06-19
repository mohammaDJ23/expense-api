import { Module, type MiddlewareConsumer, type NestModule } from '@nestjs/common';

import { CompressionMiddleware } from './compression.middleware';

@Module({})
export class CompressionModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CompressionMiddleware).forRoutes('*');
    }
}
