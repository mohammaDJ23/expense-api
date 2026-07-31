import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { CreateBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/createBillsConsumersSynchronization.service';
import { ConsumersExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumersExistenceValidator.service';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';

import { FindBillByUserIdAndIdOrThrowService } from './findBillByUserIdAndIdOrThrow.service';

import type { IId } from '@/core/interfaces/id.interface';
import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';

interface IInput {
    body: CreateBillRequestDto;
    userId: string;
}

@Injectable()
export class CreateBillService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly findBillByUserIdAndIdOrThrowService: FindBillByUserIdAndIdOrThrowService,
        private readonly consumersExistenceValidatorService: ConsumersExistenceValidatorService,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
        private readonly receiverExistenceValidatorService: ReceiverExistenceValidatorService,
        private readonly createBillsConsumerSynchronizationService: CreateBillsConsumersSynchronizationService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await Promise.all([
            this.receiverExistenceValidatorService.validate({
                userId: input.userId,
                id: input.body.receiverId,
            }),
            this.locationExistenceValidatorService.validate({
                userId: input.userId,
                id: input.body.locationId,
            }),
            this.consumersExistenceValidatorService.validate({
                userId: input.userId,
                ids: input.body.consumerIds,
            }),
        ]);

        const createdBill = await this.commandBus.execute<CreateBillCommand, ISelectBill>(
            new CreateBillCommand({
                amount: input.body.amount,
                description: input.body.description,
                purchasedAt: getCurrentUTCTimestamp(input.body.purchasedAt),
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
                userId: input.userId,
                locationId: input.body.locationId,
                receiverId: input.body.receiverId,
            }),
        );

        await this.createBillsConsumerSynchronizationService.synchronize({
            billId: createdBill.id,
            consumerIds: input.body.consumerIds,
        });

        {
            const bill = await this.findBillByUserIdAndIdOrThrowService.execute({
                userId: input.userId,
                billId: createdBill.id,
            });

            await this.outboxEventPublisherService.publish({
                aggregateId: bill.id,
                aggregateType: 'bills',
                eventType: 'created',
                payload: bill,
                createdAt: getCurrentUTCTimestamp(),
            });
        }

        return {
            id: createdBill.id,
        };
    }
}
