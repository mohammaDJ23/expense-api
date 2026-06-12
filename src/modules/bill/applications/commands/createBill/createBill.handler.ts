import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { CreateBillCommand } from './createBill.command';

import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@CommandHandler(CreateBillCommand)
export class CreateBillHandler implements ICommandHandler<CreateBillCommand> {
    constructor(private readonly billRepository: BillRepository) {}

    execute(command: CreateBillCommand): Promise<TSelectBill> {
        return this.billRepository.create(command);
    }
}
