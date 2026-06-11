import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { CreateConsumerCommand } from '@/modules/consumers/applications/commands/createConsumer/createConsumer.command';
import { ConsumerRepository } from '@/modules/consumers/infrastructure/repositories/consumer.repository';

import type { TSelectConsumer } from '@/modules/consumers/infrastructure/schemas/consumer.schema';

@CommandHandler(CreateConsumerCommand)
export class CreateConsumerHandler implements ICommandHandler<CreateConsumerCommand> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    execute(command: CreateConsumerCommand): Promise<TSelectConsumer> {
        return this.consumerRepository.create(command);
    }
}
