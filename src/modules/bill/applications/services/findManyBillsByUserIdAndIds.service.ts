import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindManyBillsByUserIdAndIdsQuery } from '@/modules/bill/applications/queries/findManyBillsByUserIdAndIds/findManyBillsByUserIdAndIds.query';
import { BillAssemblerService } from '@/modules/bill/applications/services/relations/billAssembler.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class FindManyBillsByUserIdAndIdsService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billAssemblerService: BillAssemblerService,
    ) {}

    async execute(userId: string, billIds: string[]): Promise<IBill[]> {
        const bills = await this.queryBus.execute<FindManyBillsByUserIdAndIdsQuery, ISelectBill[]>(
            new FindManyBillsByUserIdAndIdsQuery({
                userId,
                ids: billIds,
            }),
        );
        return this.billAssemblerService.assembleMany(userId, bills);
    }
}
