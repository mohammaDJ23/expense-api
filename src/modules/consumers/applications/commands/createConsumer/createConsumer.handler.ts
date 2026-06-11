import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ConsumerRepository } from '@/modules/consumers/infrastructure/repositories/consumer.repository';

import { CreateConsumerCommand } from './createConsumer.command';

import type { TSelectConsumer } from '@/modules/consumers/infrastructure/schemas/consumer.schema';

@CommandHandler(CreateConsumerCommand)
export class CreateConsumerHandler implements ICommandHandler<CreateConsumerCommand> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    execute(command: CreateConsumerCommand): Promise<TSelectConsumer> {
        return this.consumerRepository.create(command);
    }
}
