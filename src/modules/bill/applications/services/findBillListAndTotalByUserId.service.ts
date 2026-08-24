import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindTotalBillsByUserIdQuery } from '@/modules/bill/applications/queries/findTotalBillsByUserId/findTotalBillsByUserId.query';

import { FindBillListByUserIdService } from './findBillListByUserId.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';

interface IInput {
    userId: string;
    query: FindBillListRequestDto;
}

@Injectable()
export class FindBillListAndTotalByUserIdService implements IService<
    IInput,
    IListResultWithTotal<IBill, string>
> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly findBillListByUserIdService: FindBillListByUserIdService,
    ) {}

    async execute(input: IInput): Promise<IListResultWithTotal<IBill, string>> {
        const [billList, total] = await Promise.all([
            this.findBillListByUserIdService.execute(input),
            this.queryDispatcher.execute<FindTotalBillsByUserIdQuery, number>(
                new FindTotalBillsByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);

        return {
            ...billList,
            total,
        };
    }
}
