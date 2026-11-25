import { Injectable } from '@nestjs/common';

import { QueryCacheInvalidatorService } from '@/core/features/queryCache/queryCacheInvalidator.service';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';
import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    userId: string;
}

@Injectable()
export class ConsumerCacheInvalidatorService implements IService<IInput, void> {
    constructor(private readonly queryCacheInvalidatorService: QueryCacheInvalidatorService) {}

    async execute(input: IInput): Promise<void> {
        await Promise.all([
            this.queryCacheInvalidatorService.invalidateScope(
                ConsumerResource.CONSUMER,
                input.userId,
            ),
            this.queryCacheInvalidatorService.invalidateScope(
                BillResource.BILL_CONSUMER,
                input.userId,
            ),
        ]);
    }
}
