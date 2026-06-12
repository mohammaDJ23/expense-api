import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { BillConsumerService } from '@/modules/consumer/applications/services/billConsumer.service';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { UserConsumerService } from '@/modules/consumer/applications/services/userConsumer.service';
import { LocationService } from '@/modules/location/applications/services/location.service';
import { UserLocationService } from '@/modules/location/applications/services/userLocation.service';
import { ReceiverService } from '@/modules/receiver/applications/services/receiver.service';
import { UserReceiverService } from '@/modules/receiver/applications/services/userReceiver.service';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';

@Injectable()
export class BillService {
    // eslint-disable-next-line max-params
    constructor(
        private readonly commandBus: CommandBus,
        private readonly consumerService: ConsumerService,
        private readonly userConsumerService: UserConsumerService,
        private readonly billConsumerService: BillConsumerService,
        private readonly locationService: LocationService,
        private readonly userLocationService: UserLocationService,
        private readonly receiverService: ReceiverService,
        private readonly userReceiverService: UserReceiverService,
    ) {}

    @Transactional()
    async create(data: CreateBillRequestDto, user: ICurrentUser): Promise<boolean> {
        try {
            const consumers = await this.consumerService.getOrCreateMany(data.consumers);
            await this.userConsumerService.getOrCreateMany(user.id, consumers);

            const location = await this.locationService.getOrCreate(data.location);
            await this.userLocationService.getOrCreate(user.id, location.id);

            const receiver = await this.receiverService.getOrCreate(data.receiver);
            await this.userReceiverService.getOrCreate(user.id, receiver.id);

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
            const bill = await this.commandBus.execute<CreateBillCommand, TSelectBill>(
                createBillCommand,
            );
            await this.billConsumerService.createMany(bill.id, consumers);

            return true;
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
