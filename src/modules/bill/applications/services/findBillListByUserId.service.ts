import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { BillListCursorPaginationDefinition } from '@/modules/bill/applications/pagination/cursor/billListCursorPagination.definition';
import { FindBillListByUserIdQuery } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.query';
import { BillsAssemblerService } from '@/modules/bill/applications/services/relations/billsAssembler.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { IBillListCursor } from '@/modules/bill/domain/types/billListCursor.type';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';

interface IInput {
    userId: string;
    query: FindBillListRequestDto;
}

@Injectable()
export class FindBillListByUserIdService implements IService<IInput, IListResult<IBill, string>> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly billsAssemblerService: BillsAssemblerService,
        private readonly cursorPaginationService: CursorPaginationService,
        private readonly billListCursorPaginationDefinition: BillListCursorPaginationDefinition,
    ) {}

    async execute(input: IInput): Promise<IListResult<IBill, string>> {
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

        return this.cursorPaginationService.paginate(
            assembledBills,
            input.query.limit,
            this.billListCursorPaginationDefinition,
        );
    }

    private parseCursor(cursor: string | null): IBillListCursor | null {
        try {
            return this.cursorPaginationService.decode(
                cursor,
                this.billListCursorPaginationDefinition,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
