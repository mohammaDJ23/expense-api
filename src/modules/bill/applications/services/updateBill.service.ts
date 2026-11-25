import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { ProjectionService } from '@/core/services/projection.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateBillCommand } from '@/modules/bill/applications/commands/updateBill/updateBill.command';
import { BillsConsumersRelationLoaderService } from '@/modules/bill/applications/services/relations/billsConsumersRelationLoader.service';
import { CreateBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/createBillsConsumersSynchronization.service';
import { DeleteBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/deleteBillsConsumersSynchronization.service';
import { BillExistenceValidatorService } from '@/modules/bill/applications/services/validators/billExistenceValidator.service';
import { BillCacheInvalidatorService } from '@/modules/bill/infrastructure/cache/billCacheInvalidator.service';
import { BillElasticsearchIndexerService } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearchIndexer.service';
import { ConsumersExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumersExistenceValidator.service';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { UpdateBillRequestDto } from '@/modules/bill/interface/dtos/updateBill.request.dto';

interface IInput {
    userId: string;
    body: UpdateBillRequestDto;
}

@Injectable()
export class UpdateBillService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly billExistenceValidatorService: BillExistenceValidatorService,
        private readonly consumersExistenceValidatorService: ConsumersExistenceValidatorService,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
        private readonly receiverExistenceValidatorService: ReceiverExistenceValidatorService,
        private readonly billsConsumersRelationLoaderService: BillsConsumersRelationLoaderService,
        private readonly createBillsConsumersSynchronizationService: CreateBillsConsumersSynchronizationService,
        private readonly deleteBillsConsumersSynchronizationService: DeleteBillsConsumersSynchronizationService,
        private readonly projectionSerivce: ProjectionService,
        private readonly billCacheInvalidatorService: BillCacheInvalidatorService,
        private readonly billElasticsearchIndexerService: BillElasticsearchIndexerService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const updatedBill = await this.update(input);

        await this.projectionSerivce.execute([
            this.billCacheInvalidatorService.execute({ userId: input.userId }),
            this.billElasticsearchIndexerService.execute(updatedBill),
        ]);

        return {
            id: updatedBill.id,
        };
    }

    @Transactional()
    async update(input: IInput): Promise<ISelectBill> {
        await Promise.all([
            this.billExistenceValidatorService.validate({
                userId: input.userId,
                id: input.body.id,
            }),
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

        const creationTime = getCurrentUTCTimestamp();

        let existenceConsumerIds: string[];
        {
            const billsConsumers = await this.billsConsumersRelationLoaderService.load({
                billId: input.body.id,
                userId: input.userId,
            });

            existenceConsumerIds = billsConsumers.map((billConsumer) => billConsumer.consumerId);
        }

        let idsToCreate: string[];
        let idsToDelete: string[];
        {
            const receivedConsumerIdsSet = new Set<string>(input.body.consumerIds);
            const existenceConsumerIdsSet = new Set<string>(existenceConsumerIds);

            idsToCreate = input.body.consumerIds.filter(
                (consumerId) => !existenceConsumerIdsSet.has(consumerId),
            );
            idsToDelete = existenceConsumerIds.filter(
                (existenceId) => !receivedConsumerIdsSet.has(existenceId),
            );
        }

        const [, , updatedBill] = await Promise.all([
            this.createBillsConsumersSynchronizationService.synchronize({
                billId: input.body.id,
                consumerIds: idsToCreate,
            }),
            this.deleteBillsConsumersSynchronizationService.synchronize({
                billId: input.body.id,
                consumerIds: idsToDelete,
            }),
            this.commandBus.execute<UpdateBillCommand, ISelectBill>(
                new UpdateBillCommand({
                    id: input.body.id,
                    amount: input.body.amount,
                    description: input.body.description,
                    purchasedAt: input.body.purchasedAt,
                    updatedAt: creationTime,
                    userId: input.userId,
                    receiverId: input.body.receiverId,
                    locationId: input.body.locationId,
                }),
            ),
        ]);

        return updatedBill;
    }
}
