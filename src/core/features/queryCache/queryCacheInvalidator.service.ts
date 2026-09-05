import { Injectable } from '@nestjs/common';

import { QueryCacheService } from './queryCache.service';

import type { TQueryCacheNamespace } from './queryCacheNamespace.type';

@Injectable()
export class QueryCacheInvalidatorService {
    constructor(private readonly queryCacheService: QueryCacheService) {}

    async invalidateScope(namespace: TQueryCacheNamespace, scopeId: string): Promise<void> {
        await this.queryCacheService.invalidateScope(namespace, scopeId);
    }
}
