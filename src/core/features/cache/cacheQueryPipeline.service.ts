import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CACHEABLE_METADATA_KEY } from './cache.constants';
import { CacheService } from './cache.service';

import type { INormalizedCacheable } from './cacheable.type';
import type { TQuery } from './query.type';
import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    query: TQuery;
    next: () => Promise<unknown>;
}

@Injectable()
export class CacheQueryPipeline implements IService<IInput, unknown> {
    constructor(
        private readonly cacheService: CacheService,
        private readonly reflector: Reflector,
    ) {}

    async execute(input: IInput): Promise<unknown> {
        const cacheable = this.reflector.get<INormalizedCacheable | undefined>(
            CACHEABLE_METADATA_KEY,
            input.constructor,
        );

        if (!cacheable) {
            return input.next();
        }

        const scopeId = cacheable.scope(input.query);

        try {
            const cached = await this.cacheService.get(cacheable.namespace, scopeId, input.query);
            if (cached !== null) {
                return cached;
            }
        } catch {
            throw new InternalServerErrorException('Unable to retrieve the data from the cache');
        }

        const result = await input.next();

        try {
            await this.cacheService.set(
                cacheable.namespace,
                scopeId,
                input.query,
                result,
                cacheable.ttl,
            );
        } catch {
            throw new InternalServerErrorException('Unable to store the data to the cache');
        }

        return result;
    }
}
