import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { cursorPagination } from '@/core/utils/pagination/cursorPagination.util';
import { parseCursor } from '@/core/utils/pagination/parseCursor.util';
import { FindBillListByUserIdQuery } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.query';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { ICursor } from '@/core/utils/pagination/cursor.type';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';

interface IInput {
    userId: string;
    query: FindBillListRequestDto;
}

@Injectable()
export class FindBillListByUserIdService implements IService<IInput, IListResult<IBill>> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly billsAssemblerService: BillsAssemblerService,
    ) {}

    async execute(input: IInput): Promise<IListResult<IBill>> {
        const bills = await this.queryDispatcher.execute<FindBillListByUserIdQuery, ISelectBill[]>(
            new FindBillListByUserIdQuery({
                userId: input.userId,
                cursor: this.parseCursor(input.query.cursor),
                limit: input.query.limit,
            }),
        );

        const assembledBills = await this.billsAssemblerService.assemble({
            userId: input.userId,
            bills,
        });

        return cursorPagination(assembledBills, input.query.limit);
    }

    parseCursor(cursor: string | null): ICursor | null {
        try {
            return parseCursor(cursor);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
