import { Injectable } from '@nestjs/common';

import { QueryCacheInvalidatorService } from '@/core/features/queryCache/queryCacheInvalidator.service';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    userId: string;
}

@Injectable()
export class BillCacheInvalidatorService implements IService<IInput, void> {
    constructor(private readonly queryCacheInvalidatorService: QueryCacheInvalidatorService) {}

    async execute(input: IInput): Promise<void> {
        await Promise.all([
            this.queryCacheInvalidatorService.invalidateScope(BillResource.BILL, input.userId),
            this.queryCacheInvalidatorService.invalidateScope(
                BillResource.BILL_CONSUMER,
                input.userId,
            ),
        ]);
    }
}
