import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindBillByUserIdAndIdOrThrowQuery } from '@/modules/bill/applications/queries/findBillByUserIdAndIdOrThrow/findBillByUserIdAndIdOrThrow.query';
import { FindBillConsumerTargetsByRefIdsQuery } from '@/modules/consumer/applications/queries/findBillConsumerTargetsByRefIds/findBillConsumerTargetsByRefIds.query';
import { FindLocationByIdOrThrowQuery } from '@/modules/location/applications/queries/findLocationByIdOrThrow/findLocationByIdOrThrow.query';
import { FindReceiverByIdOrThrowQuery } from '@/modules/receiver/applications/queries/findReceiverByIdOrThrow/findReceiverByIdOrThrow.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ITargetBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class FindBillByUserIdAndIdOrThrowService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, billId: string): Promise<IBill> {
        const bill = await this.findBillEntity(userId, billId);

        const [receiver, location, consumers] = await Promise.all([
            this.findReceiverByIdOrThrow(bill.receiverId),
            this.findLocationByIdOrThrow(bill.locationId),
            this.findBillConsumerTargetsByRefId(billId),
        ]);

        return {
            ...bill,
            receiver,
            location,
            consumers,
        };
    }

    private findReceiverByIdOrThrow(id: string): Promise<ISelectReceiver> {
        return this.queryBus.execute<FindReceiverByIdOrThrowQuery, ISelectReceiver>(
            new FindReceiverByIdOrThrowQuery(id),
        );
    }

    private findLocationByIdOrThrow(id: string): Promise<ISelectLocation> {
        return this.queryBus.execute<FindLocationByIdOrThrowQuery, ISelectLocation>(
            new FindLocationByIdOrThrowQuery(id),
        );
    }

    private findBillConsumerTargetsByRefId(billId: string): Promise<ITargetBillConsumer[]> {
        return this.queryBus.execute<FindBillConsumerTargetsByRefIdsQuery, ITargetBillConsumer[]>(
            new FindBillConsumerTargetsByRefIdsQuery([billId]),
        );
    }

    private findBillEntity(userId: string, billId: string): Promise<ISelectBill> {
        return this.queryBus.execute<FindBillByUserIdAndIdOrThrowQuery, ISelectBill>(
            new FindBillByUserIdAndIdOrThrowQuery(userId, billId),
        );
    }
}
