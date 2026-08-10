import { Injectable } from '@nestjs/common';

import { FindBillListByUserIdService } from '@/modules/bill/applications/services/findBillListByUserId.service';

import type { IExportDataLoader } from '@/core/features/export/exportDataLoader.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';

interface IInput {
    userId: string;
    query: FindBillListRequestDto;
}

@Injectable()
export class BillsExportDataLoaderService implements IExportDataLoader<IInput, IListResult<IBill>> {
    constructor(private readonly findBillListByUserIdService: FindBillListByUserIdService) {}

    load(input: IInput): Promise<IListResult<IBill>> {
        return this.findBillListByUserIdService.execute(input);
    }
}
