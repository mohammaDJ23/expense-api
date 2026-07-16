import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { CreateBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/createBillsConsumersSynchronization.service';
import { ConsumersExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumersExistenceValidator.service';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';

import { FindBillByUserIdAndIdOrThrowService } from './findBillByUserIdAndIdOrThrow.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';

@Injectable()
export class CreateBillService implements IServiceHandler {
    // eslint-disable-next-line max-params
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
    async execute(data: CreateBillRequestDto, userId: string): Promise<IdEntity> {
        await Promise.all([
            this.receiverExistenceValidatorService.validate({ userId, id: data.receiverId }),
            this.locationExistenceValidatorService.validate({ userId, id: data.locationId }),
            this.consumersExistenceValidatorService.validate({ userId, ids: data.consumerIds }),
        ]);

        const createdBill = await this.commandBus.execute<CreateBillCommand, ISelectBill>(
            new CreateBillCommand({
                amount: data.amount,
                description: data.description,
                purchasedAt: data.purchasedAt ? getCurrentUTCTimestamp(data.purchasedAt) : null,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
                userId,
                locationId: data.locationId,
                receiverId: data.receiverId,
            }),
        );

        await this.createBillsConsumerSynchronizationService.synchronize({
            billId: createdBill.id,
            consumerIds: data.consumerIds,
        });

        {
            const bill = await this.findBillByUserIdAndIdOrThrowService.execute(
                userId,
                createdBill.id,
            );

            await this.outboxEventPublisherService.publish({
                aggregateId: bill.id,
                aggregateType: 'bills',
                eventType: 'created',
                payload: bill,
                createdAt: getCurrentUTCTimestamp(),
            });
        }

        return IdEntity.create(createdBill.id);
    }
}
