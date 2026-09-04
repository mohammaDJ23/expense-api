import { Injectable } from '@nestjs/common';

import { CacheInvalidatorService } from '@/core/features/cache/cacheInvalidator.service';
import { concurrency } from '@/core/utils/concurrency.util';
import { ReceiverResource } from '@/modules/receiver/domain/enums/receiver.enum';

import type { IProcessor } from '@/core/interfaces/processor.interface';

interface IInput {
    userIds: string[];
}

@Injectable()
export class ReceiverCacheInvalidatorProcessor implements IProcessor<IInput, void> {
    constructor(private readonly cacheInvalidatorService: CacheInvalidatorService) {}

    async process(input: IInput): Promise<void> {
        await Promise.all(
            input.userIds.map((userId) =>
                concurrency(() =>
                    this.cacheInvalidatorService.invalidateScope(ReceiverResource.RECEIVER, userId),
                ),
            ),
        );
    }
}
