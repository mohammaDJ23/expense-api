import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindBillListByUserIdQuery } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.query';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';

interface IInput {
    userId: string;
    query: FindBillListRequestDto;
}

@Injectable()
export class FindBillListByUserIdService implements IService<IInput, IBill[]> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billsAssemblerService: BillsAssemblerService,
    ) {}

    async execute(input: IInput): Promise<IBill[]> {
        const bills = await this.queryBus.execute<FindBillListByUserIdQuery, ISelectBill[]>(
            new FindBillListByUserIdQuery({
                userId: input.userId,
                offset: input.query.offset,
                limit: input.query.limit,
            }),
        );
        return this.billsAssemblerService.assemble({ userId: input.userId, bills });
    }
}
