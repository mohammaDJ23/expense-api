import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { isEmpty } from '@/common/utils/isEmpty.util';
import { FindBillListByUserIdQuery } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.query';

import { BillAggregateService } from './billAggregate.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';

@Injectable()
export class FindBillListByUserIdService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billAggregateService: BillAggregateService,
    ) {}

    async execute(userId: string, options: FindBillListRequestDto): Promise<IBill[]> {
        const bills = await this.queryBus.execute<FindBillListByUserIdQuery, ISelectBill[]>(
            new FindBillListByUserIdQuery({
                userId,
                offset: options.offset,
                limit: options.limit,
            }),
        );

        if (isEmpty(bills)) {
            return [];
        }

        return this.billAggregateService.execute(userId, bills);
    }
}
