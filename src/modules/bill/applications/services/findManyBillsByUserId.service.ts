import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindManyBillsByUserIdQuery } from '@/modules/bill/applications/queries/findManyBillsByUserId/findManyBillsByUserId.query';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

interface IInput {
    userId: string;
}

@Injectable()
export class FindManyBillsByUserIdService implements IService<IInput, IBill[]> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billsAssemblerService: BillsAssemblerService,
    ) {}

    async execute(input: IInput): Promise<IBill[]> {
        const bills = await this.queryBus.execute<FindManyBillsByUserIdQuery, ISelectBill[]>(
            new FindManyBillsByUserIdQuery({
                userId: input.userId,
            }),
        );
        return this.billsAssemblerService.assemble({
            userId: input.userId,
            bills,
        });
    }
}
