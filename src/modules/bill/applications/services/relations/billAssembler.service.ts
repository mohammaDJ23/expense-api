import { Injectable } from '@nestjs/common';

import { ConsumersRelationLoaderService } from './consumersRelationLoader.service';
import { LocationRelationLoaderService } from './locationRelationLoader.service';
import { ReceiverRelationLoaderService } from './receiverRelationLoader.service';

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
        private readonly locationRelationLoaderService: LocationRelationLoaderService,
        private readonly receiverRelationLoaderService: ReceiverRelationLoaderService,
        private readonly consumersRelationLoaderService: ConsumersRelationLoaderService,
    ) {}

    async assemble(input: IInput): Promise<IOutput> {
        const [location, receiver, consumers] = await Promise.all([
            this.locationRelationLoaderService.load(input),
            this.receiverRelationLoaderService.load(input),
            this.consumersRelationLoaderService.load([input.bill]),
        ]);

        return {
            ...input.bill,
            location,
            receiver,
            consumers,
        };
    }
}
