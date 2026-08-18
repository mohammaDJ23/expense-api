import { Injectable } from '@nestjs/common';
import pLimit from 'p-limit';

import { CacheInvalidatorService } from '@/core/features/cache/cacheInvalidator.service';
import { CacheNamespace } from '@/core/features/cache/cacheNamespace.enum';

import type { IProcessor } from '@/core/interfaces/processor.interface';

interface IInput {
    userIds: string[];
}

@Injectable()
export class ReceiverCacheInvalidatorProcessor implements IProcessor<IInput, void> {
    private readonly concurrency = pLimit(2);

    constructor(private readonly cacheInvalidatorService: CacheInvalidatorService) {}

    async process(input: IInput): Promise<void> {
        await Promise.all(
            input.userIds.map((userId) =>
                this.concurrency(() =>
                    this.cacheInvalidatorService.invalidateScope(CacheNamespace.RECEIVER, userId),
                ),
            ),
        );
    }
}
