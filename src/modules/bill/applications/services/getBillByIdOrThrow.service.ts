import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetBillByIdOrThrowQuery } from '@/modules/bill/applications/queries/getBillByIdOrThrow/getBillByIdOrThrow.query';
import { GetManyJoinedBillsConsumersByIdService } from '@/modules/consumer/applications/services/getManyJoinedBillsConsumersById.service';
import { GetJoinedUserLocationByIdOrThrowService } from '@/modules/location/applications/services/GetJoinedUserLocationByIdOrThrow.service';
import { GetJoinedUserReceiverByIdOrThrowService } from '@/modules/receiver/applications/services/getJoinedUserReceiverByIdOrThrow.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class GetBillByIdOrThrowService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly getJoinedUserReceiverByIdOrThrowService: GetJoinedUserReceiverByIdOrThrowService,
        private readonly getJoinedUserLocationByIdOrThrowService: GetJoinedUserLocationByIdOrThrowService,
        private readonly getManyJoinedBillsConsumersByIdService: GetManyJoinedBillsConsumersByIdService,
    ) {}

    async execute(userId: string, billId: string): Promise<IBill> {
        const bill = await this.getEntity(userId, billId);
        const [receiver, location, consumers] = await Promise.all([
            this.getJoinedUserReceiverByIdOrThrowService.execute(userId, bill.receiverId),
            this.getJoinedUserLocationByIdOrThrowService.execute(userId, bill.locationId),
            this.getManyJoinedBillsConsumersByIdService.execute(billId),
        ]);
        return Object.assign(bill, {
            receiver,
            location,
            consumers,
        });
    }

    private async getEntity(userId: string, billId: string): Promise<TSelectBill> {
        try {
            const getBillByIdOrThrowQuery = new GetBillByIdOrThrowQuery(userId, billId);
            return await this.queryBus.execute<GetBillByIdOrThrowQuery, TSelectBill>(
                getBillByIdOrThrowQuery,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
