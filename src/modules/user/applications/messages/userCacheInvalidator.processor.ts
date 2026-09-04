import { Injectable } from '@nestjs/common';

import { DEFAULT_CACHE_SCOPE } from '@/core/features/cache/cache.constants';
import { CacheInvalidatorService } from '@/core/features/cache/cacheInvalidator.service';
import { concurrency } from '@/core/utils/concurrency.util';
import { UserResource } from '@/modules/user/domain/enums/user.enum';

import type { IProcessor } from '@/core/interfaces/processor.interface';

interface IInput {
    userIds: string[];
}

@Injectable()
export class UserCacheInvalidatorProcessor implements IProcessor<IInput, void> {
    constructor(private readonly cacheInvalidatorService: CacheInvalidatorService) {}

    async process(input: IInput): Promise<void> {
        await Promise.all(
            input.userIds.map(() =>
                concurrency(() =>
                    this.cacheInvalidatorService.invalidateScope(
                        UserResource.USER,
                        DEFAULT_CACHE_SCOPE,
                    ),
                ),
            ),
        );
    }
}
