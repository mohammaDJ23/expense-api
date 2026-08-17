import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindBillByUserIdAndIdOrThrowQuery } from '@/modules/bill/applications/queries/findBillByUserIdAndIdOrThrow/findBillByUserIdAndIdOrThrow.query';
import { BillAssemblerService } from '@/modules/bill/applications/services/relations/billAssembler.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

interface IInput {
    userId: string;
    billId: string;
}

@Injectable()
export class FindBillByUserIdAndIdOrThrowService implements IService<IInput, IBill> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly billAssemblerService: BillAssemblerService,
    ) {}

    async execute(input: IInput): Promise<IBill> {
        const bill = await this.queryDispatcher.execute<
            FindBillByUserIdAndIdOrThrowQuery,
            ISelectBill
        >(
            new FindBillByUserIdAndIdOrThrowQuery({
                userId: input.userId,
                id: input.billId,
            }),
        );
        return this.billAssemblerService.assemble({
            userId: input.userId,
            bill,
        });
    }
}
