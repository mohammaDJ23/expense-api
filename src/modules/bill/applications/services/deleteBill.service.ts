import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { DeleteBillCommand } from '@/modules/bill/applications/commands/deleteBill/deleteBill.command';
import { BillExistenceValidatorService } from '@/modules/bill/applications/services/validators/billExistenceValidator.service';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

interface IInput {
    userId: string;
    billId: string;
}

@Injectable()
export class DeleteBillService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly billExistenceValidatorService: BillExistenceValidatorService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await this.billExistenceValidatorService.validate({
            userId: input.userId,
            id: input.billId,
        });

        const deletedBill = await this.commandBus.execute<DeleteBillCommand, ISelectBill>(
            new DeleteBillCommand({
                userId: input.userId,
                id: input.billId,
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: deletedBill.id,
            aggregateType: 'bills',
            eventType: 'deleted',
            payload: deletedBill,
            createdAt: getCurrentUTCTimestamp(),
        });

        return {
            id: deletedBill.id,
        };
    }
}
