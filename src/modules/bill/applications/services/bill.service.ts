import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindTotalBillsByUserIdQuery } from '@/modules/bill/applications/queries/findTotalBillsByUserId/findTotalBillsByUserId.query';
import { DeleteBillService } from '@/modules/bill/applications/services/deleteBill.service';
import { UpdateBillService } from '@/modules/bill/applications/services/updateBill.service';

import { CreateBillService } from './createBill.service';
import { FindBillByUserIdAndIdOrThrowService } from './findBillByUserIdAndIdOrThrow.service';
import { FindBillListByUserIdService } from './findBillListByUserId.service';

import type { IId } from '@/core/interfaces/id.interface';
import type { IListResult } from '@/core/interfaces/listResult.interface';
import type { ITotal } from '@/core/interfaces/total.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import type { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';
import type { UpdateBillRequestDto } from '@/modules/bill/interface/dtos/updateBill.request.dto';

@Injectable()
export class BillService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly createBillService: CreateBillService,
        private readonly updateBillService: UpdateBillService,
        private readonly deleteBillService: DeleteBillService,
        private readonly findBillByUserIdAndIdOrThrowService: FindBillByUserIdAndIdOrThrowService,
        private readonly findBillListByUserIdService: FindBillListByUserIdService,
    ) {}

    create(userId: string, body: CreateBillRequestDto): Promise<IId> {
        return this.createBillService.execute({ body, userId });
    }

    update(userId: string, body: UpdateBillRequestDto): Promise<IId> {
        return this.updateBillService.execute({ body, userId });
    }

    delete(userId: string, billId: string): Promise<IId> {
        return this.deleteBillService.execute({ userId, billId });
    }

    findListByUserId(userId: string, query: FindBillListRequestDto): Promise<IListResult<IBill>> {
        return this.findBillListByUserIdService.execute({ userId, query });
    }

    findByUserIdAndId(userId: string, billId: string): Promise<IBill> {
        return this.findBillByUserIdAndIdOrThrowService.execute({ userId, billId });
    }

    findTotal(userId: string): Promise<ITotal> {
        return this.queryBus
            .execute<FindTotalBillsByUserIdQuery, number>(
                new FindTotalBillsByUserIdQuery({
                    userId,
                }),
            )
            .then((total) => ({ total }));
    }
}
