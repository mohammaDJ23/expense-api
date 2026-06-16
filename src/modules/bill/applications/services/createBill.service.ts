import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { CreateManyBillsConsumersService } from '@/modules/consumer/applications/services/createManybillsConsumers.service';
import { CreateManyUsersConsumersIfNotExistsService } from '@/modules/consumer/applications/services/createManyUsersConsumersIfNotExists.service';
import { GetManyConsumersByNameOrCreateService } from '@/modules/consumer/applications/services/getManyConsumersByNameOrCreate.service';
import { CreateUserLocationIfNotExistsService } from '@/modules/location/applications/services/createUserLocationIfNotExists.service';
import { GetLocationByNameOrCreateService } from '@/modules/location/applications/services/getLocationByNameOrCreate.service';
import { CreateUserReceiverIfNotExistsService } from '@/modules/receiver/applications/services/createUserReceiverIfNotExists.service';
import { GetReceiverByNameOrCreateService } from '@/modules/receiver/applications/services/getReceiverByNameOrCreate.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';

@Injectable()
export class CreateBillService implements IServiceHandler {
    // eslint-disable-next-line max-params
    constructor(
        private readonly commandBus: CommandBus,
        private readonly getManyConsumersByNameOrCreateService: GetManyConsumersByNameOrCreateService,
        private readonly createManyUsersConsumersIfNotExistsService: CreateManyUsersConsumersIfNotExistsService,
        private readonly createManyBillsConsumersService: CreateManyBillsConsumersService,
        private readonly getLocationByNameOrCreateService: GetLocationByNameOrCreateService,
        private readonly createUserLocationIfNotExistsService: CreateUserLocationIfNotExistsService,
        private readonly getReceiverByNameOrCreateService: GetReceiverByNameOrCreateService,
        private readonly createUserReceiverIfNotExistsService: CreateUserReceiverIfNotExistsService,
    ) {}

    @Transactional()
    async execute(data: CreateBillRequestDto, userId: string): Promise<boolean> {
        try {
            const [consumers, location, receiver] = await Promise.all([
                this.getManyConsumersByNameOrCreateService.execute(data.consumers),
                this.getLocationByNameOrCreateService.execute(data.location),
                this.getReceiverByNameOrCreateService.execute(data.receiver),
            ]);

            const createBillCommand = new CreateBillCommand({
                amount: data.amount,
                description: data.description,
                purchasedAt: data.purchasedAt ? getCurrentUTCTimestamp(data.purchasedAt) : null,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
                userId,
                locationId: location.id,
                receiverId: receiver.id,
            });
            const bill = await this.commandBus.execute<CreateBillCommand, TSelectBill>(
                createBillCommand,
            );

            await Promise.all([
                this.createManyBillsConsumersService.execute(bill.id, consumers),
                this.createManyUsersConsumersIfNotExistsService.execute(userId, consumers),
                this.createUserLocationIfNotExistsService.execute(userId, location.id),
                this.createUserReceiverIfNotExistsService.execute(userId, receiver.id),
            ]);

            return true;
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
