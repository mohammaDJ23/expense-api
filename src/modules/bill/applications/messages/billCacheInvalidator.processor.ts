import { Injectable } from '@nestjs/common';
import pLimit from 'p-limit';

import { CacheInvalidatorService } from '@/core/features/cache/cacheInvalidator.service';
import { BillResource } from '@/modules/bill/bill.enum';

import type { IProcessor } from '@/core/interfaces/processor.interface';

interface IInput {
    userIds: string[];
}

@Injectable()
export class BillCacheInvalidatorProcessor implements IProcessor<IInput, void> {
    private readonly concurrency = pLimit(2);

    constructor(private readonly cacheInvalidatorService: CacheInvalidatorService) {}

    async process(input: IInput): Promise<void> {
        await Promise.all(
            input.userIds.map((userId) =>
                this.concurrency(() =>
                    Promise.all([
                        this.cacheInvalidatorService.invalidateScope(BillResource.BILL, userId),
                        this.cacheInvalidatorService.invalidateScope(
                            BillResource.BILL_CONSUMER,
                            userId,
                        ),
                    ]),
                ),
            ),
        );
    }
}
