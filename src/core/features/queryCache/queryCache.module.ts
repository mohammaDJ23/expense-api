import { Module } from '@nestjs/common';

import { QueryCacheService } from './queryCache.service';
import { QueryCacheHasherService } from './queryCacheHasher.service';
import { QueryCacheInvalidatorService } from './queryCacheInvalidator.service';
import { QueryCacheKeyService } from './queryCacheKey.service';
import { QueryCachePipelineService } from './queryCachePipeline.service';

@Module({
    providers: [
        QueryCacheHasherService,
        QueryCacheKeyService,
        QueryCacheService,
        QueryCacheInvalidatorService,
        QueryCachePipelineService,
        QueryCacheHasherService,
    ],
    exports: [QueryCachePipelineService, QueryCacheInvalidatorService],
})
export class QueryCacheModule {}
