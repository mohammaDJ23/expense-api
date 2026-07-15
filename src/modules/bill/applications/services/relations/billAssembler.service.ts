import { Injectable } from '@nestjs/common';

import { BillConsumersRelationLoaderService } from './billConsumersRelationLoader.service';
import { BillLocationRelationLoaderService } from './billLocationRelationLoader.service';
import { BillReceiverRelationLoaderService } from './billReceiverRelationLoader.service';

import type { IRelationAssemblerService } from '@/core/interfaces/relationAssemblerService.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

interface IInput {
    userId: string;
    bill: ISelectBill;
}

interface IOutput extends IBill {}

@Injectable()
export class BillAssemblerService implements IRelationAssemblerService<IInput, IOutput> {
    constructor(
        private readonly billLocationRelationLoaderService: BillLocationRelationLoaderService,
        private readonly billReceiverRelationLoaderService: BillReceiverRelationLoaderService,
        private readonly billConsumersRelationLoaderService: BillConsumersRelationLoaderService,
    ) {}

    async assemble(input: IInput): Promise<IOutput> {
        const [location, receiver, consumers] = await Promise.all([
            this.billLocationRelationLoaderService.load(input),
            this.billReceiverRelationLoaderService.load(input),
            this.billConsumersRelationLoaderService.load([input.bill]),
        ]);

        return {
            ...input.bill,
            location,
            receiver,
            consumers,
        };
    }
}
