import { Injectable } from '@nestjs/common';
import pLimit from 'p-limit';

import { DEFAULT_CACHE_SCOPE } from '@/core/features/cache/cache.constants';
import { CacheInvalidatorService } from '@/core/features/cache/cacheInvalidator.service';
import { UserResource } from '@/modules/user/user.enum';

import type { IProcessor } from '@/core/interfaces/processor.interface';

interface IInput {
    userIds: string[];
}

@Injectable()
export class UserCacheInvalidatorProcessor implements IProcessor<IInput, void> {
    private readonly concurrency = pLimit(2);

    constructor(private readonly cacheInvalidatorService: CacheInvalidatorService) {}

    async process(input: IInput): Promise<void> {
        await Promise.all(
            input.userIds.map(() =>
                this.concurrency(() =>
                    this.cacheInvalidatorService.invalidateScope(
                        UserResource.USER,
                        DEFAULT_CACHE_SCOPE,
                    ),
                ),
            ),
        );
    }
}
