import { Module, type MiddlewareConsumer, type NestModule } from '@nestjs/common';

import { ClientTimezoneMiddleware } from './clientTimezone.middleware';

@Module({})
export class ClientTimezoneModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ClientTimezoneMiddleware).forRoutes('*');
    }
}
