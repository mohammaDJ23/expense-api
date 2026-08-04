import { Injectable } from '@nestjs/common';

import { FindManyBillsByUserIdService } from '@/modules/bill/applications/services/findManyBillsByUserId.service';

import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { IExportDataLoader } from '@/modules/export/domain/interfaces/exportDataLoader.interface';

interface IInput {
    userId: string;
}

@Injectable()
export class BillsExportDataLoaderService implements IExportDataLoader<IInput, IBill[]> {
    constructor(private readonly findManyBillsByUserIdService: FindManyBillsByUserIdService) {}

    load(input: IInput): Promise<IBill[]> {
        return this.findManyBillsByUserIdService.execute({
            userId: input.userId,
        });
    }
}
