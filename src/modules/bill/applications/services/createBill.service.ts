import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { ProjectionService } from '@/core/services/projection.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { CreateBillsConsumersSynchronizationService } from '@/modules/bill/applications/services/synchronizations/createBillsConsumersSynchronization.service';
import { BillCacheInvalidatorService } from '@/modules/bill/infrastructure/cache/billCacheInvalidator.service';
import { BillElasticsearchIndexerService } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearchIndexer.service';
import { ConsumersExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumersExistenceValidator.service';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
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
        private readonly consumersExistenceValidatorService: ConsumersExistenceValidatorService,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
        private readonly receiverExistenceValidatorService: ReceiverExistenceValidatorService,
        private readonly createBillsConsumerSynchronizationService: CreateBillsConsumersSynchronizationService,
        private readonly projectionService: ProjectionService,
        private readonly billElasticsearchIndexerService: BillElasticsearchIndexerService,
        private readonly billCacheInvalidatorService: BillCacheInvalidatorService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const createdBill = await this.create(input);

        await this.projectionService.execute([
            this.billCacheInvalidatorService.execute({ userId: input.userId }),
            this.billElasticsearchIndexerService.execute(createdBill),
        ]);

        return {
            id: createdBill.id,
        };
    }

    @Transactional()
    async create(input: IInput): Promise<ISelectBill> {
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

        const creationTime = getCurrentUTCTimestamp();

        const createdBill = await this.commandBus.execute<CreateBillCommand, ISelectBill>(
            new CreateBillCommand({
                amount: input.body.amount,
                description: input.body.description,
                purchasedAt: getCurrentUTCTimestamp(input.body.purchasedAt),
                createdAt: creationTime,
                updatedAt: creationTime,
                userId: input.userId,
                locationId: input.body.locationId,
                receiverId: input.body.receiverId,
            }),
        );

        await this.createBillsConsumerSynchronizationService.synchronize({
            billId: createdBill.id,
            consumerIds: input.body.consumerIds,
        });

        return createdBill;
    }
}
