import { Injectable } from '@nestjs/common';

import { CacheService } from './cache.service';

import type { TCacheNamespace } from './cacheNamespace.type';

@Injectable()
export class CacheInvalidatorService {
    constructor(private readonly cacheService: CacheService) {}

    async invalidateScope(namespace: TCacheNamespace, scopeId: string): Promise<void> {
        await this.cacheService.invalidateScope(namespace, scopeId);
    }
}
