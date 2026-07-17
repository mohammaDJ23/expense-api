import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindManyBillsByUserIdAndIdsQuery } from '@/modules/bill/applications/queries/findManyBillsByUserIdAndIds/findManyBillsByUserIdAndIds.query';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';

import type { IServiceHandler } from '@/core/interfaces/service.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class FindManyBillsByUserIdAndIdsService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billsAssemblerService: BillsAssemblerService,
    ) {}

    async execute(userId: string, billIds: string[]): Promise<IBill[]> {
        const bills = await this.queryBus.execute<FindManyBillsByUserIdAndIdsQuery, ISelectBill[]>(
            new FindManyBillsByUserIdAndIdsQuery({
                userId,
                ids: billIds,
            }),
        );
        return this.billsAssemblerService.assemble({ userId, bills });
    }
}
