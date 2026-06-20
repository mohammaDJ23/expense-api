import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { CreateManyBillsConsumersService } from '@/modules/consumer/applications/services/createManybillsConsumers.service';
import { CreateManyUsersConsumersIfNotExistsService } from '@/modules/consumer/applications/services/createManyUsersConsumersIfNotExists.service';
import { GetManyConsumersByNameOrCreateService } from '@/modules/consumer/applications/services/getManyConsumersByNameOrCreate.service';
import { CreateUserLocationIfNotExistsService } from '@/modules/location/applications/services/createUserLocationIfNotExists.service';
import { GetLocationByNameOrCreateService } from '@/modules/location/applications/services/getLocationByNameOrCreate.service';
import { CreateReceiverCommand } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.command';
import { CreateUserReceiverCommand } from '@/modules/receiver/applications/commands/createUserReceiver/createUserReceiver.command';
import { FindReceiverByNameOrNullQuery } from '@/modules/receiver/applications/queries/findReceiverByNameOrNull/findReceiverByNameOrNull.query';
import { FindUserReceiverByIdOrNullQuery } from '@/modules/receiver/applications/queries/findUserReceiverByIdOrNull/findUserReceiverByIdOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { ISelectUserReceiver } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

@Injectable()
export class CreateBillService implements IServiceHandler {
    // eslint-disable-next-line max-params
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly getManyConsumersByNameOrCreateService: GetManyConsumersByNameOrCreateService,
        private readonly createManyUsersConsumersIfNotExistsService: CreateManyUsersConsumersIfNotExistsService,
        private readonly createManyBillsConsumersService: CreateManyBillsConsumersService,
        private readonly getLocationByNameOrCreateService: GetLocationByNameOrCreateService,
        private readonly createUserLocationIfNotExistsService: CreateUserLocationIfNotExistsService,
    ) {}

    @Transactional()
    async execute(data: CreateBillRequestDto, userId: string): Promise<boolean> {
        try {
            const [consumers, location, receiver] = await Promise.all([
                this.getManyConsumersByNameOrCreateService.execute(data.consumers),
                this.getLocationByNameOrCreateService.execute(data.location),
                this.findReceiverByNameOrCreate(data.receiver),
            ]);
            const bill = await this.createEntity(data, userId, location.id, receiver.id);
            await Promise.all([
                this.createManyBillsConsumersService.execute(bill.id, consumers),
                this.createManyUsersConsumersIfNotExistsService.execute(userId, consumers),
                this.createUserLocationIfNotExistsService.execute(userId, location.id),
                this.createUserReceiverIfNotExists(userId, receiver.id),
            ]);
            return true;
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    private findUserReceiverByIdOrNull(
        userId: string,
        receiverId: string,
    ): Promise<ISelectUserReceiver | null> {
        return this.queryBus.execute<FindUserReceiverByIdOrNullQuery, ISelectUserReceiver | null>(
            new FindUserReceiverByIdOrNullQuery(userId, receiverId),
        );
    }

    private createUserReceiver(userId: string, receiverId: string): Promise<ISelectUserReceiver> {
        return this.commandBus.execute<CreateUserReceiverCommand, ISelectUserReceiver>(
            new CreateUserReceiverCommand({
                userId,
                receiverId,
                createdAt: getCurrentUTCTimestamp(),
            }),
        );
    }

    private async createUserReceiverIfNotExists(userId: string, receiverId: string): Promise<void> {
        const userReceiver = await this.findUserReceiverByIdOrNull(userId, receiverId);
        if (!userReceiver) {
            await this.createUserReceiver(userId, receiverId);
        }
    }

    private findReceiverByNameOrNull(name: string): Promise<ISelectReceiver | null> {
        return this.queryBus.execute<FindReceiverByNameOrNullQuery, ISelectReceiver | null>(
            new FindReceiverByNameOrNullQuery(name),
        );
    }

    private createReceiver(name: string): Promise<ISelectReceiver> {
        return this.commandBus.execute<CreateReceiverCommand, ISelectReceiver>(
            new CreateReceiverCommand({
                name,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
            }),
        );
    }

    private async findReceiverByNameOrCreate(name: string): Promise<ISelectReceiver> {
        const receiver = await this.findReceiverByNameOrNull(name);
        if (!receiver) {
            return this.createReceiver(name);
        }
        return receiver;
    }

    private createEntity(
        data: CreateBillRequestDto,
        userId: string,
        locationId: string,
        receiverId: string,
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
}
