import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { CreateUserConsumerCommand } from './createUserConsumer.command';

import type { TSelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@CommandHandler(CreateUserConsumerCommand)
export class CreateUserConsumerHandler implements ICommandHandler<CreateUserConsumerCommand> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    execute(command: CreateUserConsumerCommand): Promise<TSelectUserConsumer> {
        return this.userConsumerRepository.create(command);
    }
}
