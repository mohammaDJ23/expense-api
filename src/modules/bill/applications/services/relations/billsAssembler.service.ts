import { Injectable } from '@nestjs/common';

import { groupBy } from '@/common/utils/groupBy.util';

import { BillConsumersRelationLoaderService } from './billConsumersRelationLoader.service';
import { BillLocationsRelationLoaderService } from './billLocationsRelationLoader.service';
import { BillReceiversRelationLoaderService } from './billReceiversRelationLoader.service';

import type { IRelationAssemblerService } from '@/core/interfaces/relationAssemblerService.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

interface IInput {
    userId: string;
    bills: ISelectBill[];
}

type TOutput = IBill[];

@Injectable()
export class BillsAssemblerService implements IRelationAssemblerService<IInput, TOutput> {
    constructor(
        private readonly billLocationsRelationLoaderService: BillLocationsRelationLoaderService,
        private readonly billReceiversRelationLoaderService: BillReceiversRelationLoaderService,
        private readonly billConsumersRelationLoaderService: BillConsumersRelationLoaderService,
    ) {}

    async assemble(input: IInput): Promise<TOutput> {
        const [locations, receivers, consumers] = await Promise.all([
            this.billLocationsRelationLoaderService.load(input),
            this.billReceiversRelationLoaderService.load(input),
            this.billConsumersRelationLoaderService.load(input.bills),
        ]);

        const locationsMap = new Map(locations.map((location) => [location.id, location]));
        const receiversMap = new Map(receivers.map((receiver) => [receiver.id, receiver]));
        const groupedConsumers = groupBy(consumers, (consumer) => consumer.billId);

        return input.bills.map((bill) => ({
            ...bill,
            location: locationsMap.get(bill.locationId)!,
            receiver: receiversMap.get(bill.receiverId)!,
            consumers: groupedConsumers[bill.id] ?? [],
        }));
    }
}
