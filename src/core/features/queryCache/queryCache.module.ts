import { Module } from '@nestjs/common';

import { CacheModule } from '@/core/features/cache/cache.module';

import { QueryCacheService } from './queryCache.service';
import { QueryCacheHasherService } from './queryCacheHasher.service';
import { QueryCacheInvalidatorService } from './queryCacheInvalidator.service';
import { QueryCacheKeyService } from './queryCacheKey.service';
import { QueryCachePipelineService } from './queryCachePipeline.service';

@Module({
    imports: [CacheModule],
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
