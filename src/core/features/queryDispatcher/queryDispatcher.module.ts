import { Module } from '@nestjs/common';

import { QueryCacheModule } from '@/core/features/queryCache/queryCache.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';

import { QueryDispatcher } from './query.dispatcher';
import { QueryPipeline } from './query.pipeline';

@Module({
    imports: [CqrsModule, QueryCacheModule],
    providers: [QueryDispatcher, QueryPipeline],
    exports: [QueryDispatcher],
})
export class QueryDispatcherModule {}
