import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { createCursorPagination } from '@/core/utils/cursor/createCursorPagination.util';
import { parseCursor } from '@/core/utils/cursor/parseCursor.util';
import { FindBillListByUserIdQuery } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.query';
import { FindTotalBillsByUserIdQuery } from '@/modules/bill/applications/queries/findTotalBillsByUserId/findTotalBillsByUserId.query';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/listResult.type';
import type { ICursor } from '@/core/utils/cursor/cursor.type';
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
        private readonly queryBus: QueryBus,
        private readonly billsAssemblerService: BillsAssemblerService,
    ) {}

    async execute(input: IInput): Promise<IListResult<IBill>> {
        const [bills, total] = await Promise.all([
            this.queryBus.execute<FindBillListByUserIdQuery, ISelectBill[]>(
                new FindBillListByUserIdQuery({
                    userId: input.userId,
                    cursor: this.parseCursor(input.query.cursor),
                    limit: input.query.limit,
                }),
            ),
            this.queryBus.execute<FindTotalBillsByUserIdQuery, number>(
                new FindTotalBillsByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);

        const cursorPagination = createCursorPagination(bills, input.query.limit);

        const assembledBills = await this.billsAssemblerService.assemble({
            userId: input.userId,
            bills: cursorPagination.items,
        });

        return {
            items: assembledBills,
            total,
            hasNextPage: cursorPagination.hasNextPage,
            nextCursor: cursorPagination.nextCursor,
        };
    }

    parseCursor(cursor: string | null): ICursor | null {
        try {
            return parseCursor(cursor);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
