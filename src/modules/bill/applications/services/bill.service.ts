import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { LocationService } from '@/modules/location/applications/services/location.service';
import { ReceiverService } from '@/modules/receiver/applications/services/receiver.service';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class BillService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly consumerService: ConsumerService,
        private readonly locationService: LocationService,
        private readonly receiverService: ReceiverService,
    ) {}

    private async getOrCreateConsumers(names: string[]): Promise<TSelectConsumer[]> {
        const existencesConsumers = await this.consumerService.getManyByName(names);
        const consumersToCreate = this.consumerService.getNamesForCreation(
            existencesConsumers,
            names,
        );
        if (consumersToCreate.length > 0) {
            const createdConsumers = await this.consumerService.createMany(consumersToCreate);
            return this.consumerService.concatExistencesWithCreated(
                existencesConsumers,
                createdConsumers,
            );
        }
        return existencesConsumers;
    }

    private async getOrCreateLocation(name: string): Promise<TSelectLocation> {
        const location = await this.locationService.getByNameOrNull(name);
        if (location) {
            return location;
        }
        return this.locationService.create(name);
    }

    private async getOrCreateReceiver(name: string): Promise<TSelectReceiver> {
        const receiver = await this.receiverService.getByNameOrNull(name);
        if (receiver) {
            return receiver;
        }
        return this.receiverService.create(name);
    }

    @Transactional()
    async create(data: CreateBillRequestDto, user: ICurrentUser): Promise<TSelectBill> {
        try {
            const consumers = await this.getOrCreateConsumers(data.consumers);
            const location = await this.getOrCreateLocation(data.location);
            const receiver = await this.getOrCreateReceiver(data.receiver);

            const createBillCommand = new CreateBillCommand({
                amount: data.amount,
                description: data.description,
                purchasedAt: data.purchasedAt ? new Date(data.purchasedAt) : null,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: user.id,
                locationId: location.id,
                receiverId: receiver.id,
            });
            return await this.commandBus.execute<CreateBillCommand, TSelectBill>(createBillCommand);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
