import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyBillsQuery } from '@/modules/bill/applications/queries/getManyBills/getManyBills.query';
import { GetManyJoinedBillsConsumersByIdOrThrowService } from '@/modules/consumer/applications/services/getManyJoinedBillsConsumersByIdOrThrow.service';
import { GetManyJoinedUsersLocationsByIdOrThrowService } from '@/modules/location/applications/services/getManyJoinedUsersLocationsByIdOrThrow.service';
import { GetManyJoinedUsersReceiversByIdOrThrowService } from '@/modules/receiver/applications/services/getManyJoinedUsersReceiversByIdOrThrow.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { GetManyBillsRequestDto } from '@/modules/bill/interface/dtos/getManyBills.request.dto';
import type { IJoinedBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

@Injectable()
export class GetManyBillsService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly getManyJoinedUsersReceiversByIdOrThrowService: GetManyJoinedUsersReceiversByIdOrThrowService,
        private readonly getManyJoinedUsersLocationsByIdOrThrowService: GetManyJoinedUsersLocationsByIdOrThrowService,
        private readonly getManyJoinedBillsConsumersByIdOrThrowService: GetManyJoinedBillsConsumersByIdOrThrowService,
    ) {}

    async execute(userId: string, options: GetManyBillsRequestDto): Promise<IBill[]> {
        const bills = await this.getEntities(userId, options);

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
            this.getManyJoinedUsersLocationsByIdOrThrowService.execute(userId, locationIds),
            this.getManyJoinedUsersReceiversByIdOrThrowService.execute(userId, receiverIds),
            this.getManyJoinedBillsConsumersByIdOrThrowService.execute(billIds),
        ]);

        const locationMap = new Map(locations.map((location) => [location.id, location]));
        const receiverMap = new Map(receivers.map((receiver) => [receiver.id, receiver]));
        const consumersMap = new Map<string, IJoinedBillConsumer[]>();
        consumers.forEach((consumer) => {
            const existing = consumersMap.get(consumer.billId) || [];
            existing.push(consumer);
            consumersMap.set(consumer.billId, existing);
        });

        return bills.map((bill) => ({
            ...bill,
            location: locationMap.get(bill.locationId)!,
            receiver: receiverMap.get(bill.receiverId)!,
            consumers: consumersMap.get(bill.id)!,
        }));
    }

    private async getEntities(
        userId: string,
        options: GetManyBillsRequestDto,
    ): Promise<TSelectBill[]> {
        try {
            const getManyBillsQuery = new GetManyBillsQuery(userId, options.offset, options.limit);
            return await this.queryBus.execute<GetManyBillsQuery, TSelectBill[]>(getManyBillsQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
