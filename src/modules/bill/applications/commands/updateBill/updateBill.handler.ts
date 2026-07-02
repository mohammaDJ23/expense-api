import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { UpdateBillCommand } from './updateBill.command';

import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@CommandHandler(UpdateBillCommand)
export class UpdateBillHandler implements ICommandHandler<UpdateBillCommand, ISelectBill> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(command: UpdateBillCommand): Promise<ISelectBill> {
        try {
            return await this.billRepository.update(command.props);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
