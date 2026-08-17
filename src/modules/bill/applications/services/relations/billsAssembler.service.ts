import { Injectable } from '@nestjs/common';

import { groupBy } from '@/core/utils/groupBy.util';

import { BillConsumerTargetsRelationLoaderService } from './billConsumerTargetsRelationLoader.service';
import { LocationsRelationLoaderService } from './locationsRelationLoader.service';
import { ReceiversRelationLoaderService } from './receiversRelationLoader.service';

import type { IRelationAssemblerService } from '@/core/interfaces/relations/relationAssemblerService.interface';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

interface IInput {
    userId: string;
    bills: ISelectBill[];
}

@Injectable()
export class BillsAssemblerService implements IRelationAssemblerService<IInput, IBill[]> {
    constructor(
        private readonly locationsRelationLoaderService: LocationsRelationLoaderService,
        private readonly receiversRelationLoaderService: ReceiversRelationLoaderService,
        private readonly billConsumerTargetsRelationLoaderService: BillConsumerTargetsRelationLoaderService,
    ) {}

    async assemble(input: IInput): Promise<IBill[]> {
        const billIds: string[] = [];
        const locationIds: string[] = [];
        const receiverIds: string[] = [];
        input.bills.forEach((bill) => {
            billIds.push(bill.id);
            locationIds.push(bill.locationId);
            receiverIds.push(bill.receiverId);
        });

        const [locations, receivers, consumers] = await Promise.all([
            this.locationsRelationLoaderService.load({ userId: input.userId, locationIds }),
            this.receiversRelationLoaderService.load({ userId: input.userId, receiverIds }),
            this.billConsumerTargetsRelationLoaderService.load({ billIds, userId: input.userId }),
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
