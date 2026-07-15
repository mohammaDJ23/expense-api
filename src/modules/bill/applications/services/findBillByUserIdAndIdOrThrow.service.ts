import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindBillByUserIdAndIdOrThrowQuery } from '@/modules/bill/applications/queries/findBillByUserIdAndIdOrThrow/findBillByUserIdAndIdOrThrow.query';
import { BillAssemblerService } from '@/modules/bill/applications/services/relations/billAssembler.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class FindBillByUserIdAndIdOrThrowService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billAssemblerService: BillAssemblerService,
    ) {}

    async execute(userId: string, billId: string): Promise<IBill> {
        const bill = await this.queryBus.execute<FindBillByUserIdAndIdOrThrowQuery, ISelectBill>(
            new FindBillByUserIdAndIdOrThrowQuery({
                userId,
                id: billId,
            }),
        );
        return this.billAssemblerService.assemble({ userId, bill });
    }
}
