import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { DeleteBillCommand } from '@/modules/bill/applications/commands/deleteBill/deleteBill.command';
import { IsBillExistsByUserIdAndIdQuery } from '@/modules/bill/applications/queries/isBillExistsByUserIdAndId/isBillExistsByUserIdAndId.query';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBillOutboxEvent } from '@/modules/bill/domain/interfaces/billOutboxEvent.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class DeleteBillService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, billId: string): Promise<IdEntity> {
        {
            const isExists = await this.queryBus.execute<IsBillExistsByUserIdAndIdQuery, boolean>(
                new IsBillExistsByUserIdAndIdQuery(userId, billId),
            );
            if (!isExists) {
                throw new BadRequestException('Could not found the bill');
            }
        }

        {
            const deletedBill = await this.commandBus.execute<DeleteBillCommand, ISelectBill>(
                new DeleteBillCommand(userId, billId),
            );

            await this.commandBus.execute<
                CreateOutboxEventCommand<IBillOutboxEvent>,
                ISelectOutboxEvent
            >(
                new CreateOutboxEventCommand<IBillOutboxEvent>({
                    aggregateId: deletedBill.id,
                    aggregateType: 'bills',
                    eventType: 'deleted',
                    payload: deletedBill,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );

            return IdEntity.create(deletedBill.id);
        }
    }
}
