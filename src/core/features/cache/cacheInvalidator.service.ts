import { Injectable } from '@nestjs/common';

import { CacheService } from './cache.service';

import type { CacheNamespace } from './cacheNamespace.enum';

@Injectable()
export class CacheInvalidatorService {
    constructor(private readonly cacheService: CacheService) {}

    async invalidateScope(namespace: CacheNamespace, scopeId?: string): Promise<void> {
        await this.cacheService.invalidateScope(namespace, scopeId);
    }
}
