import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { CreateManyUsersConsumersCommand } from './createManyUsersConsumers.command';

import type { TSelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@CommandHandler(CreateManyUsersConsumersCommand)
export class CreateManyUsersConsumersHandler implements ICommandHandler<CreateManyUsersConsumersCommand> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    execute(command: CreateManyUsersConsumersCommand): Promise<TSelectUserConsumer[]> {
        return this.userConsumerRepository.createMany(command.usersConsumers);
    }
}
