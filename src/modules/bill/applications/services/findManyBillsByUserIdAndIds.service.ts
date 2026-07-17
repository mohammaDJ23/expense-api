import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindManyBillsByUserIdAndIdsQuery } from '@/modules/bill/applications/queries/findManyBillsByUserIdAndIds/findManyBillsByUserIdAndIds.query';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

interface IInput {
    userId: string;
    billIds: string[];
}

@Injectable()
export class FindManyBillsByUserIdAndIdsService implements IService<IInput, IBill[]> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billsAssemblerService: BillsAssemblerService,
    ) {}

    async execute(input: IInput): Promise<IBill[]> {
        const bills = await this.queryBus.execute<FindManyBillsByUserIdAndIdsQuery, ISelectBill[]>(
            new FindManyBillsByUserIdAndIdsQuery({
                userId: input.userId,
                ids: input.billIds,
            }),
        );
        return this.billsAssemblerService.assemble({ userId: input.userId, bills });
    }
}
