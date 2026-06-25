import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { CreateBillCommand } from './createBill.command';

import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@CommandHandler(CreateBillCommand)
export class CreateBillHandler implements ICommandHandler<CreateBillCommand, ISelectBill> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(command: CreateBillCommand): Promise<ISelectBill> {
        try {
            return await this.billRepository.create(command);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
