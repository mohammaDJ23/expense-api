import { Injectable } from '@nestjs/common';

import { QueryCacheInvalidatorService } from '@/core/features/queryCache/queryCacheInvalidator.service';
import { concurrency } from '@/core/utils/concurrency.util';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';
import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';

import type { IProcessor } from '@/core/interfaces/processor.interface';

interface IInput {
    userIds: string[];
}

@Injectable()
export class ConsumerCacheInvalidatorProcessor implements IProcessor<IInput, void> {
    constructor(private readonly queryCacheInvalidatorService: QueryCacheInvalidatorService) {}

    async process(input: IInput): Promise<void> {
        await Promise.all(
            input.userIds.map((userId) =>
                concurrency(() =>
                    Promise.all([
                        this.queryCacheInvalidatorService.invalidateScope(
                            ConsumerResource.CONSUMER,
                            userId,
                        ),
                        this.queryCacheInvalidatorService.invalidateScope(
                            BillResource.BILL_CONSUMER,
                            userId,
                        ),
                    ]),
                ),
            ),
        );
    }
}
