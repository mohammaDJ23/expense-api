import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { isEmpty } from '@/common/utils/isEmpty.util';
import { FindManyBillsByUserIdAndIdsQuery } from '@/modules/bill/applications/queries/findManyBillsByUserIdAndIds/findManyBillsByUserIdAndIds.query';

import { BillAggregateService } from './billAggregate.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class FindManyBillsByUserIdAndIdsService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billAggregateService: BillAggregateService,
    ) {}

    async execute(userId: string, billIds: string[]): Promise<IBill[]> {
        const bills = await this.queryBus.execute<FindManyBillsByUserIdAndIdsQuery, ISelectBill[]>(
            new FindManyBillsByUserIdAndIdsQuery({
                userId,
                ids: billIds,
            }),
        );

        if (isEmpty(bills)) {
            return [];
        }

        return this.billAggregateService.execute(userId, bills);
    }
}
