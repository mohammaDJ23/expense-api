import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindBillListByUserIdQuery } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.query';
import { FindBillConsumerTargetsByRefIdsQuery } from '@/modules/consumer/applications/queries/findBillConsumerTargetsByRefIds/findBillConsumerTargetsByRefIds.query';
import { FindManyLocationsByIdsQuery } from '@/modules/location/applications/queries/findManyLocationsByIds/findManyLocationsByIds.query';
import { FindManyReceiversByIdsQuery } from '@/modules/receiver/applications/queries/findManyReceiversByIds/findManyReceiversByIds.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';
import type { ITargetBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class FindBillListByUserIdService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, options: FindBillListRequestDto): Promise<IBill[]> {
        const bills = await this.findBillEntities(userId, options);

        if (bills.length <= 0) {
            return [];
        }

        const billIds: string[] = [];
        const locationIds: string[] = [];
        const receiverIds: string[] = [];
        bills.forEach((bill) => {
            billIds.push(bill.id);
            locationIds.push(bill.locationId);
            receiverIds.push(bill.receiverId);
        });

        const [locations, receivers, consumers] = await Promise.all([
            this.findManyLocationsByIds(locationIds),
            this.findManyReceiversByIds(receiverIds),
            this.findBillConsumerTargetsByRefIds(billIds),
        ]);

        return bills.map((bill) => ({
            ...bill,
            location: locations.find((location) => location.id === bill.locationId)!,
            receiver: receivers.find((receiver) => receiver.id === bill.receiverId)!,
            consumers: consumers.filter((consumer) => consumer.billId === bill.id),
        }));
    }

    private findManyLocationsByIds(locationIds: string[]): Promise<ISelectLocation[]> {
        return this.queryBus.execute<FindManyLocationsByIdsQuery, ISelectLocation[]>(
            new FindManyLocationsByIdsQuery(locationIds),
        );
    }

    private findManyReceiversByIds(receiverIds: string[]): Promise<ISelectReceiver[]> {
        return this.queryBus.execute<FindManyReceiversByIdsQuery, ISelectReceiver[]>(
            new FindManyReceiversByIdsQuery(receiverIds),
        );
    }

    private findBillConsumerTargetsByRefIds(billIds: string[]): Promise<ITargetBillConsumer[]> {
        return this.queryBus.execute<FindBillConsumerTargetsByRefIdsQuery, ITargetBillConsumer[]>(
            new FindBillConsumerTargetsByRefIdsQuery(billIds),
        );
    }

    private findBillEntities(
        userId: string,
        options: FindBillListRequestDto,
    ): Promise<ISelectBill[]> {
        return this.queryBus.execute<FindBillListByUserIdQuery, ISelectBill[]>(
            new FindBillListByUserIdQuery(userId, options.offset, options.limit),
        );
    }
}
