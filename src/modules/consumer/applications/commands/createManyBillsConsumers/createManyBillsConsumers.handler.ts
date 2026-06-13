import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';

import { CreateManyBillsConsumersCommand } from './createManyBillsConsumers.command';

import type { TSelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

@CommandHandler(CreateManyBillsConsumersCommand)
export class CreateManyBillsConsumersHandler implements ICommandHandler<CreateManyBillsConsumersCommand> {
    constructor(private readonly billConsumerRepository: BillConsumerRepository) {}

    execute(command: CreateManyBillsConsumersCommand): Promise<TSelectBillConsumer[]> {
        return this.billConsumerRepository.createMany(command.billsConsumers);
    }
}
