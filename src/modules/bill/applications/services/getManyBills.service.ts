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

        return bills.map((bill) => ({
            ...bill,
            location: locations.find((location) => location.id === bill.locationId)!,
            receiver: receivers.find((receiver) => receiver.id === bill.receiverId)!,
            consumers: consumers.filter((consumer) => consumer.billId === consumer.id),
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
