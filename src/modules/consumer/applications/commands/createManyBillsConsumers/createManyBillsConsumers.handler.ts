import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';

import { CreateManyBillsConsumersCommand } from './createManyBillsConsumers.command';

import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

@CommandHandler(CreateManyBillsConsumersCommand)
export class CreateManyBillsConsumersHandler implements ICommandHandler<
    CreateManyBillsConsumersCommand,
    ISelectBillConsumer[]
> {
    constructor(private readonly billConsumerRepository: BillConsumerRepository) {}

    async execute(command: CreateManyBillsConsumersCommand): Promise<ISelectBillConsumer[]> {
        try {
            return await this.billConsumerRepository.createMany(command.props.billsConsumers);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
