import { Injectable } from '@nestjs/common';

import { CacheService } from '@/core/features/cache/cache.service';

@Injectable()
export class LocalSignupStorageService {
    constructor(private readonly cacheService: CacheService) {}

    async set(key: string, value: string): Promise<void> {
        await this.cacheService.set(this.createKey(key), value, 1 * 60 * 10);
    }

    get(key: string): Promise<string | null> {
        return this.cacheService.get(this.createKey(key));
    }

    async delete(key: string): Promise<void> {
        await this.cacheService.delete(this.createKey(key));
    }

    private createKey(key: string): string {
        return `local-signup:${key}`;
    }
}
