import { Module } from '@nestjs/common';

import { QueryDispatcher } from './query.dispatcher';
import { QueryPipeline } from './query.pipeline';

@Module({
    providers: [QueryDispatcher, QueryPipeline],
})
export class QueryDispatcherModule {}
