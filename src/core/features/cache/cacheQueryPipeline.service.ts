import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CACHEABLE_METADATA_KEY } from './cache.constants';
import { CacheService } from './cache.service';

import type { INormalizedCacheable } from './cacheable.type';
import type { IQueryPipeline } from '@/core/features/queryDispatcher/queryPipeline.interface';
import type { TQuery } from '@/infrastructure/cqrs/query.type';

@Injectable()
export class CacheQueryPipelineService implements IQueryPipeline {
    constructor(
        private readonly cacheService: CacheService,
        private readonly reflector: Reflector,
    ) {}

    async use(query: TQuery, next: () => Promise<unknown>): Promise<unknown> {
        const cacheable = this.reflector.get<INormalizedCacheable | undefined>(
            CACHEABLE_METADATA_KEY,
            query.constructor,
        );

        if (!cacheable) {
            return next();
        }

        const scopeId = cacheable.scope(query);

        try {
            const cached = await this.cacheService.get(cacheable.namespace, scopeId, query);
            if (cached !== null) {
                return cached;
            }
        } catch {
            throw new InternalServerErrorException('Unable to retrieve data from the cache');
        }

        const result = await next();

        try {
            await this.cacheService.set(cacheable.namespace, scopeId, query, result, cacheable.ttl);
        } catch {
            throw new InternalServerErrorException('Unable to store data to the cache');
        }

        return result;
    }
}
