import { Injectable } from '@nestjs/common';

import { groupBy } from '@/common/utils/groupBy.util';

import { BillConsumerRelationLoaderService } from './billConsumerRelationLoader.service';
import { BillLocationRelationLoaderService } from './billLocationRelationLoader.service';
import { BillReceiverRelationLoaderService } from './billReceiverRelationLoader.service';

import type { IManyRelationsAssemblerByUserIdService } from '@/core/interfaces/relationLoaders/manyRelationsAssemblerByUserIdService.interface';
import type { IOneRelationAssemblerByUserIdService } from '@/core/interfaces/relationLoaders/oneRelationAssemblerByUserIdService.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class BillAssemblerService
    implements
        IOneRelationAssemblerByUserIdService<ISelectBill, IBill>,
        IManyRelationsAssemblerByUserIdService<ISelectBill, IBill>
{
    constructor(
        private readonly billLocationRelationLoaderService: BillLocationRelationLoaderService,
        private readonly billReceiverRelationLoaderService: BillReceiverRelationLoaderService,
        private readonly billConsumerRelationLoaderService: BillConsumerRelationLoaderService,
    ) {}

    async assembleOne(userId: string, source: ISelectBill): Promise<IBill> {
        const [location, receiver, consumers] = await Promise.all([
            this.billLocationRelationLoaderService.loadOne(userId, source),
            this.billReceiverRelationLoaderService.loadOne(userId, source),
            this.billConsumerRelationLoaderService.loadMany(userId, [source]),
        ]);

        return {
            ...source,
            location,
            receiver,
            consumers,
        };
    }

    async assembleMany(userId: string, sources: ISelectBill[]): Promise<IBill[]> {
        const [locations, receivers, consumers] = await Promise.all([
            this.billLocationRelationLoaderService.loadMany(userId, sources),
            this.billReceiverRelationLoaderService.loadMany(userId, sources),
            this.billConsumerRelationLoaderService.loadMany(userId, sources),
        ]);

        const locationsMap = new Map(locations.map((location) => [location.id, location]));
        const receiversMap = new Map(receivers.map((receiver) => [receiver.id, receiver]));
        const groupedConsumers = groupBy(consumers, (consumer) => consumer.billId);

        return sources.map((source) => ({
            ...source,
            location: locationsMap.get(source.locationId)!,
            receiver: receiversMap.get(source.receiverId)!,
            consumers: groupedConsumers[source.id] ?? [],
        }));
    }
}
