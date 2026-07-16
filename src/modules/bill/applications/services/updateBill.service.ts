import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { UpdateBillCommand } from '@/modules/bill/applications/commands/updateBill/updateBill.command';
import { BillsConsumersRelationLoaderService } from '@/modules/bill/applications/services/relations/billsConsumersRelationLoader.service';
import { CreateBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/createBillsConsumersSynchronization.service';
import { DeleteBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/deleteBillsConsumersSynchronization.service';
import { BillExistenceValidatorService } from '@/modules/bill/applications/services/validators/billExistenceValidator.service';
import { ConsumersExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumersExistenceValidator.service';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';

import { FindBillByUserIdAndIdOrThrowService } from './findBillByUserIdAndIdOrThrow.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { UpdateBillRequestDto } from '@/modules/bill/interface/dtos/updateBill.request.dto';

@Injectable()
export class UpdateBillService implements IServiceHandler {
    // eslint-disable-next-line max-params
    constructor(
        private readonly commandBus: CommandBus,
        private readonly findBillByUserIdAndIdOrThrowService: FindBillByUserIdAndIdOrThrowService,
        private readonly billExistenceValidatorService: BillExistenceValidatorService,
        private readonly consumersExistenceValidatorService: ConsumersExistenceValidatorService,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
        private readonly receiverExistenceValidatorService: ReceiverExistenceValidatorService,
        private readonly billsConsumersRelationLoaderService: BillsConsumersRelationLoaderService,
        private readonly createBillsConsumersSynchronizationService: CreateBillsConsumersSynchronizationService,
        private readonly deleteBillsConsumersSynchronizationService: DeleteBillsConsumersSynchronizationService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(data: UpdateBillRequestDto, userId: string): Promise<IdEntity> {
        await Promise.all([
            this.billExistenceValidatorService.validate({ userId, id: data.id }),
            this.receiverExistenceValidatorService.validate({ userId, id: data.receiverId }),
            this.locationExistenceValidatorService.validate({ userId, id: data.locationId }),
            this.consumersExistenceValidatorService.validate({ userId, ids: data.consumerIds }),
        ]);

        {
            let existenceConsumerIds: string[];
            {
                const billsConsumers = await this.billsConsumersRelationLoaderService.load({
                    billId: data.id,
                });

                existenceConsumerIds = billsConsumers.map(
                    (billConsumer) => billConsumer.consumerId,
                );
            }

            let idsToCreate: string[];
            let idsToDelete: string[];
            {
                const receivedConsumerIdsSet = new Set<string>(data.consumerIds);
                const existenceConsumerIdsSet = new Set<string>(existenceConsumerIds);

                idsToCreate = data.consumerIds.filter(
                    (consumerId) => !existenceConsumerIdsSet.has(consumerId),
                );
                idsToDelete = existenceConsumerIds.filter(
                    (existenceId) => !receivedConsumerIdsSet.has(existenceId),
                );
            }

            await Promise.all([
                this.createBillsConsumersSynchronizationService.synchronize({
                    billId: data.id,
                    consumerIds: idsToCreate,
                }),
                this.deleteBillsConsumersSynchronizationService.synchronize({
                    billId: data.id,
                    consumerIds: idsToDelete,
                }),
                this.commandBus.execute<UpdateBillCommand, ISelectBill>(
                    new UpdateBillCommand({
                        id: data.id,
                        amount: data.amount,
                        description: data.description,
                        purchasedAt: data.purchasedAt,
                        updatedAt: getCurrentUTCTimestamp(),
                        userId,
                        receiverId: data.receiverId,
                        locationId: data.locationId,
                    }),
                ),
            ]);
        }

        {
            const bill = await this.findBillByUserIdAndIdOrThrowService.execute(userId, data.id);

            await this.outboxEventPublisherService.publish({
                aggregateId: bill.id,
                aggregateType: 'bills',
                eventType: 'updated',
                payload: bill,
                createdAt: getCurrentUTCTimestamp(),
            });
        }

        return IdEntity.create(data.id);
    }
}
