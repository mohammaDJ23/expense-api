import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { CreateManyUserConsumerCommand } from './createManyUserConsumer.command';

import type { TSelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@CommandHandler(CreateManyUserConsumerCommand)
export class CreateManyUserConsumerHandler implements ICommandHandler<CreateManyUserConsumerCommand> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    execute(command: CreateManyUserConsumerCommand): Promise<TSelectUserConsumer[]> {
        return this.userConsumerRepository.createMany(command.userConsumers);
    }
}
