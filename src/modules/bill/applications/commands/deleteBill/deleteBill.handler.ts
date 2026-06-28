import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { DeleteBillCommand } from './deleteBill.command';

import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@CommandHandler(DeleteBillCommand)
export class DeleteBillHandler implements ICommandHandler<DeleteBillCommand, ISelectBill> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(command: DeleteBillCommand): Promise<ISelectBill> {
        try {
            return await this.billRepository.deleteByUserIdAndId(command.userId, command.billId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
