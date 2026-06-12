import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';

import { CreateManyBillConsumerCommand } from './createManyBillConsumer.command';

import type { TSelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

@CommandHandler(CreateManyBillConsumerCommand)
export class CreateManyBillConsumerHandler implements ICommandHandler<CreateManyBillConsumerCommand> {
    constructor(private readonly billConsumerRepository: BillConsumerRepository) {}

    execute(command: CreateManyBillConsumerCommand): Promise<TSelectBillConsumer[]> {
        return this.billConsumerRepository.createMany(command.billConsumers);
    }
}
