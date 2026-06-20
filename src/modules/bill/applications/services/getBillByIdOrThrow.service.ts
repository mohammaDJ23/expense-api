import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetBillByIdOrThrowQuery } from '@/modules/bill/applications/queries/getBillByIdOrThrow/getBillByIdOrThrow.query';
import { GetManyJoinedBillsConsumersByIdOrThrowService } from '@/modules/consumer/applications/services/getManyJoinedBillsConsumersByIdOrThrow.service';
import { GetManyJoinedUsersLocationsByIdOrThrowService } from '@/modules/location/applications/services/getManyJoinedUsersLocationsByIdOrThrow.service';
import { GetManyJoinedUsersReceiversByIdOrThrowService } from '@/modules/receiver/applications/services/getManyJoinedUsersReceiversByIdOrThrow.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class GetBillByIdOrThrowService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly getManyJoinedUsersReceiversByIdOrThrowService: GetManyJoinedUsersReceiversByIdOrThrowService,
        private readonly getManyJoinedUsersLocationsByIdOrThrowService: GetManyJoinedUsersLocationsByIdOrThrowService,
        private readonly getManyJoinedBillsConsumersByIdOrThrowService: GetManyJoinedBillsConsumersByIdOrThrowService,
    ) {}

    async execute(userId: string, billId: string): Promise<IBill> {
        const bill = await this.getEntity(userId, billId);
        const [receivers, locations, consumers] = await Promise.all([
            this.getManyJoinedUsersReceiversByIdOrThrowService.execute(userId, [bill.receiverId]),
            this.getManyJoinedUsersLocationsByIdOrThrowService.execute(userId, [bill.locationId]),
            this.getManyJoinedBillsConsumersByIdOrThrowService.execute([billId]),
        ]);
        return {
            ...bill,
            receiver: receivers[0],
            location: locations[0],
            consumers,
        };
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
