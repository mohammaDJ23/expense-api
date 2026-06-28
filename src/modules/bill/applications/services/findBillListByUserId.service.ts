import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { isEmpty } from '@/common/utils/isEmpty.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { FindBillListByUserIdQuery } from '@/modules/bill/applications/queries/findBillListByUserId/findBillListByUserId.query';
import { FindManyBillConsumerTargetsByRefIdsQuery } from '@/modules/consumer/applications/queries/findManyBillConsumerTargetsByRefIds/findManyBillConsumerTargetsByRefIds.query';
import { FindManyLocationsByUserIdAndIdsQuery } from '@/modules/location/applications/queries/findManyLocationsByUserIdAndIds/findManyLocationsByUserIdAndIds.query';
import { FindManyReceiversByUserIdAndIdsQuery } from '@/modules/receiver/applications/queries/findManyReceiversByUserIdAndIds/findManyReceiversByUserIdAndIds.query';

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
        const bills = await this.queryBus.execute<FindBillListByUserIdQuery, ISelectBill[]>(
            new FindBillListByUserIdQuery(userId, options.offset, options.limit),
        );

        if (isEmpty(bills)) {
            return [];
        }

        {
            const billIds: string[] = [];
            const locationIds: string[] = [];
            const receiverIds: string[] = [];
            bills.forEach((bill) => {
                billIds.push(bill.id);
                locationIds.push(bill.locationId);
                receiverIds.push(bill.receiverId);
            });

            if (isEmpty(billIds) || isEmpty(locationIds) || isEmpty(receiverIds)) {
                throw new ProcessFailedInternalServerErrorException();
            }

            {
                const [locations, receivers, consumers] = await Promise.all([
                    this.queryBus.execute<FindManyLocationsByUserIdAndIdsQuery, ISelectLocation[]>(
                        new FindManyLocationsByUserIdAndIdsQuery(userId, locationIds),
                    ),
                    this.queryBus.execute<FindManyReceiversByUserIdAndIdsQuery, ISelectReceiver[]>(
                        new FindManyReceiversByUserIdAndIdsQuery(userId, receiverIds),
                    ),
                    this.queryBus.execute<
                        FindManyBillConsumerTargetsByRefIdsQuery,
                        ITargetBillConsumer[]
                    >(new FindManyBillConsumerTargetsByRefIdsQuery(billIds)),
                ]);

                if (isEmpty(locations) || isEmpty(receivers) || isEmpty(consumers)) {
                    throw new ProcessFailedInternalServerErrorException();
                }

                return bills.map((bill) => ({
                    ...bill,
                    location: locations.find((location) => location.id === bill.locationId)!,
                    receiver: receivers.find((receiver) => receiver.id === bill.receiverId)!,
                    consumers: consumers.filter((consumer) => consumer.billId === bill.id),
                }));
            }
        }
    }
}
