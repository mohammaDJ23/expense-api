import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { DeleteBillCommand } from '@/modules/bill/applications/commands/deleteBill/deleteBill.command';
import { BillExistenceValidatorService } from '@/modules/bill/applications/services/validators/billExistenceValidator.service';
import { BillCacheInvalidatorService } from '@/modules/bill/infrastructure/cache/billCacheInvalidator.service';
import { BillElasticsearchRemoverService } from '@/modules/bill/infrastructure/elasticsearch/billElasticsearchRemove.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
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
        private readonly projectionService: ProjectionService,
        private readonly billElasticsearchRemoverService: BillElasticsearchRemoverService,
        private readonly billCacheInvalidatorService: BillCacheInvalidatorService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const deletedBill = await this.delete(input);

        await this.projectionService.execute([
            this.billCacheInvalidatorService.execute({ userId: input.userId }),
            this.billElasticsearchRemoverService.execute(deletedBill),
        ]);

        return {
            id: deletedBill.id,
        };
    }

    async delete(input: IInput): Promise<ISelectBill> {
        await this.billExistenceValidatorService.validate({
            userId: input.userId,
            id: input.billId,
        });

        return this.commandBus.execute<DeleteBillCommand, ISelectBill>(
            new DeleteBillCommand({
                userId: input.userId,
                id: input.billId,
            }),
        );
    }
}
