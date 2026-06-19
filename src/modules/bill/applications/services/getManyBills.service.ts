import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyBillsQuery } from '@/modules/bill/applications/queries/getManyBills/getManyBills.query';
import { GetManyJoinedBillsConsumersByIdService } from '@/modules/consumer/applications/services/getManyJoinedBillsConsumersById.service';
import { GetManyJoinedUsersLocationsByIdService } from '@/modules/location/applications/services/getManyJoinedUsersLocationsById.service';
import { GetManyJoinedUsersReceiversByIdService } from '@/modules/receiver/applications/services/getManyJoinedUsersReceiversById.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { GetManyBillsRequestDto } from '@/modules/bill/interface/dtos/getManyBills.request.dto';
import type { IJoinedBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

@Injectable()
export class GetManyBillsService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly getManyJoinedUsersLocationsByIdService: GetManyJoinedUsersLocationsByIdService,
        private readonly getManyJoinedUsersReceiversByIdService: GetManyJoinedUsersReceiversByIdService,
        private readonly getManyJoinedBillsConsumersByIdService: GetManyJoinedBillsConsumersByIdService,
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
            this.getManyJoinedUsersLocationsByIdService.execute(userId, locationIds),
            this.getManyJoinedUsersReceiversByIdService.execute(userId, receiverIds),
            this.getManyJoinedBillsConsumersByIdService.execute(billIds),
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
            location: this.require(locationMap.get(bill.locationId)),
            receiver: this.require(receiverMap.get(bill.receiverId)),
            consumers: this.requireArr(consumersMap.get(bill.id)),
        }));
    }

    private require<T>(data: T | undefined): T {
        if (!data) {
            throw new ProcessFailedInternalServerErrorException();
        }
        return data;
    }

    private requireArr<T>(arr: T[] | undefined): T[] {
        if (!arr) {
            throw new ProcessFailedInternalServerErrorException();
        }
        if (arr.length <= 0) {
            throw new ProcessFailedInternalServerErrorException();
        }
        return arr;
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
