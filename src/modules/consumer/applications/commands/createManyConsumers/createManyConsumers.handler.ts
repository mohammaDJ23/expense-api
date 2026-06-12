import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { CreateManyConsumersCommand } from './createManyConsumers.command';

import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@CommandHandler(CreateManyConsumersCommand)
export class CreateManyConsumersHandler implements ICommandHandler<CreateManyConsumersCommand> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    execute(command: CreateManyConsumersCommand): Promise<TSelectConsumer[]> {
        return this.consumerRepository.createMany(command.consumers);
    }
}
