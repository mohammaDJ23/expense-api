import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { isEmpty } from '@/common/utils/isEmpty.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { FindBillByUserIdAndIdOrThrowQuery } from '@/modules/bill/applications/queries/findBillByUserIdAndIdOrThrow/findBillByUserIdAndIdOrThrow.query';
import { FindManyBillConsumerTargetsByRefIdsQuery } from '@/modules/consumer/applications/queries/findManyBillConsumerTargetsByRefIds/findManyBillConsumerTargetsByRefIds.query';
import { FindLocationByUserIdAndIdOrThrowQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrThrow/findLocationByUserIdAndIdOrThrow.query';
import { FindReceiverByUserIdAndIdOrThrowQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrThrow/findReceiverByUserIdAndIdOrThrow.query';

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
        const bill = await this.queryBus.execute<FindBillByUserIdAndIdOrThrowQuery, ISelectBill>(
            new FindBillByUserIdAndIdOrThrowQuery({
                userId,
                id: billId,
            }),
        );

        {
            const [receiver, location, consumers] = await Promise.all([
                this.queryBus.execute<FindReceiverByUserIdAndIdOrThrowQuery, ISelectReceiver>(
                    new FindReceiverByUserIdAndIdOrThrowQuery({
                        userId,
                        id: bill.receiverId,
                    }),
                ),
                this.queryBus.execute<FindLocationByUserIdAndIdOrThrowQuery, ISelectLocation>(
                    new FindLocationByUserIdAndIdOrThrowQuery({
                        userId,
                        id: bill.locationId,
                    }),
                ),
                this.queryBus.execute<
                    FindManyBillConsumerTargetsByRefIdsQuery,
                    ITargetBillConsumer[]
                >(
                    new FindManyBillConsumerTargetsByRefIdsQuery({
                        billIds: [bill.id],
                    }),
                ),
            ]);

            if (isEmpty(consumers)) {
                throw new ProcessFailedInternalServerErrorException();
            }

            return { ...bill, receiver, location, consumers };
        }
    }
}
