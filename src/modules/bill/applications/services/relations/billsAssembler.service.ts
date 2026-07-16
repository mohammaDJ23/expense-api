import { Injectable } from '@nestjs/common';

import { groupBy } from '@/common/utils/groupBy.util';

import { ConsumersRelationLoaderService } from './consumersRelationLoader.service';
import { LocationsRelationLoaderService } from './locationsRelationLoader.service';
import { ReceiversRelationLoaderService } from './receiversRelationLoader.service';

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
        private readonly locationsRelationLoaderService: LocationsRelationLoaderService,
        private readonly receiversRelationLoaderService: ReceiversRelationLoaderService,
        private readonly consumersRelationLoaderService: ConsumersRelationLoaderService,
    ) {}

    async assemble(input: IInput): Promise<TOutput> {
        const [locations, receivers, consumers] = await Promise.all([
            this.locationsRelationLoaderService.load(input),
            this.receiversRelationLoaderService.load(input),
            this.consumersRelationLoaderService.load(input.bills),
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
