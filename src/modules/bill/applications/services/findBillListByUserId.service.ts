import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindBillListByUserIdQuery } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.query';
import { FindTotalBillsByUserIdQuery } from '@/modules/bill/applications/queries/findTotalBillsByUserId/findTotalBillsByUserId.query';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';

import type { IListResult } from '@/core/interfaces/listResult.interface';
import type { IService } from '@/core/interfaces/service.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';

interface IInput {
    userId: string;
    query: FindBillListRequestDto;
}

@Injectable()
export class FindBillListByUserIdService implements IService<IInput, IListResult<IBill>> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billsAssemblerService: BillsAssemblerService,
    ) {}

    async execute(input: IInput): Promise<IListResult<IBill>> {
        const [bills, total] = await Promise.all([
            this.queryBus.execute<FindBillListByUserIdQuery, ISelectBill[]>(
                new FindBillListByUserIdQuery({
                    userId: input.userId,
                    offset: input.query.offset,
                    limit: input.query.limit,
                }),
            ),
            this.queryBus.execute<FindTotalBillsByUserIdQuery, number>(
                new FindTotalBillsByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);
        const assembledBills = await this.billsAssemblerService.assemble({
            userId: input.userId,
            bills,
        });
        return {
            items: assembledBills,
            total,
        };
    }
}
