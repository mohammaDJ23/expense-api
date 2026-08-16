import { Module } from '@nestjs/common';

import { CacheModule } from '@/core/features/cache/cache.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';

import { QueryDispatcher } from './query.dispatcher';
import { QueryPipeline } from './query.pipeline';

@Module({
    imports: [CqrsModule, CacheModule],
    providers: [QueryDispatcher, QueryPipeline],
    exports: [QueryDispatcher],
})
export class QueryDispatcherModule {}
