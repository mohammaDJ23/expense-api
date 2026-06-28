import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { IdEntity } from '@/core/entities/id.entity';
import { DeleteBillCommand } from '@/modules/bill/applications/commands/deleteBill/deleteBill.command';
import { IsBillExistsByUserIdAndIdQuery } from '@/modules/bill/applications/queries/isBillExistsByUserIdAndId/isBillExistsByUserIdAndId.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class DeleteBillService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

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
            return IdEntity.create(deletedBill.id);
        }
    }
}
