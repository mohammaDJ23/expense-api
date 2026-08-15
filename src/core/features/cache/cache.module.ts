import { Module } from '@nestjs/common';

import { CacheService } from './cache.service';
import { CacheInvalidatorService } from './cacheInvalidator.service';
import { CacheKeyService } from './cacheKey.service';
import { CacheQueryHasherService } from './cacheQueryHasher.service';
import { CacheQueryPipelineService } from './cacheQueryPipeline.service';

@Module({
    providers: [
        CacheQueryHasherService,
        CacheKeyService,
        CacheService,
        CacheInvalidatorService,
        CacheQueryPipelineService,
        CacheQueryHasherService,
    ],
})
export class CacheModule {}
