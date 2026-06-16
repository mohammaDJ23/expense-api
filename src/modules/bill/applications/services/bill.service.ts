import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { GetManyBillsQuery } from '@/modules/bill/applications/queries/getManyBills/getManyBills.query';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { CreateManyBillsConsumersService } from '@/modules/consumer/applications/services/createManybillsConsumers.service';
import { UserConsumerService } from '@/modules/consumer/applications/services/userConsumer.service';
import { CreateUserLocationIfNotExistsService } from '@/modules/location/applications/services/createUserLocationIfNotExists.service';
import { GetLocationByNameOrCreateService } from '@/modules/location/applications/services/getLocationByNameOrCreate.service';
import { CreateUserReceiverIfNotExistsService } from '@/modules/receiver/applications/services/createUserReceiverIfNotExists.service';
import { GetReceiverByNameOrCreateService } from '@/modules/receiver/applications/services/getReceiverByNameOrCreate.service';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import type { GetManyBillsQueryRequestDto } from '@/modules/bill/interface/dtos/getManyBillsQuery.request.dto';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class BillService {
    // eslint-disable-next-line max-params
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly consumerService: ConsumerService,
        private readonly userConsumerService: UserConsumerService,
        private readonly createManyBillsConsumersService: CreateManyBillsConsumersService,
        private readonly getLocationByNameOrCreateService: GetLocationByNameOrCreateService,
        private readonly createUserLocationIfNotExistsService: CreateUserLocationIfNotExistsService,
        private readonly getReceiverByNameOrCreateService: GetReceiverByNameOrCreateService,
        private readonly createUserReceiverIfNotExistsService: CreateUserReceiverIfNotExistsService,
    ) {}

    private getOrCreateRequirement(
        data: CreateBillRequestDto,
    ): Promise<[TSelectConsumer[], TSelectLocation, TSelectReceiver]> {
        return Promise.all([
            this.consumerService.getOrCreateMany(data.consumers),
            this.getLocationByNameOrCreateService.execute(data.location),
            this.getReceiverByNameOrCreateService.execute(data.receiver),
        ]);
    }

    private createEntity(
        data: CreateBillRequestDto,
        locationId: string,
        receiverId: string,
        userId: string,
    ): Promise<TSelectBill> {
        const createBillCommand = new CreateBillCommand({
            amount: data.amount,
            description: data.description,
            purchasedAt: data.purchasedAt ? getCurrentUTCTimestamp(data.purchasedAt) : null,
            createdAt: getCurrentUTCTimestamp(),
            updatedAt: getCurrentUTCTimestamp(),
            userId,
            locationId,
            receiverId,
        });
        return this.commandBus.execute<CreateBillCommand, TSelectBill>(createBillCommand);
    }

    // eslint-disable-next-line max-params
    private async createAssociations(
        billId: string,
        locationId: string,
        receiverId: string,
        userId: string,
        consumers: TSelectConsumer[],
    ): Promise<void> {
        await Promise.all([
            this.createManyBillsConsumersService.execute(billId, consumers),
            this.userConsumerService.createManyIfNotExists(userId, consumers),
            this.createUserLocationIfNotExistsService.execute(userId, locationId),
            this.createUserReceiverIfNotExistsService.execute(userId, receiverId),
        ]);
    }

    @Transactional()
    async create(data: CreateBillRequestDto, user: ICurrentUser): Promise<boolean> {
        try {
            const [consumers, location, receiver] = await this.getOrCreateRequirement(data);
            const bill = await this.createEntity(data, location.id, receiver.id, user.id);
            await this.createAssociations(bill.id, location.id, receiver.id, user.id, consumers);
            return true;
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    async getMany(userId: string, options: GetManyBillsQueryRequestDto): Promise<TSelectBill[]> {
        try {
            const getManyBillsQuery = new GetManyBillsQuery(userId, options.offset, options.limit);
            return await this.queryBus.execute<GetManyBillsQuery, TSelectBill[]>(getManyBillsQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
