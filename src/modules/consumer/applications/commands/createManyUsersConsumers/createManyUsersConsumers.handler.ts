import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { CreateManyUsersConsumersCommand } from './createManyUsersConsumers.command';

import type { ISelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@CommandHandler(CreateManyUsersConsumersCommand)
export class CreateManyUsersConsumersHandler implements ICommandHandler<CreateManyUsersConsumersCommand> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    async execute(command: CreateManyUsersConsumersCommand): Promise<ISelectUserConsumer[]> {
        try {
            return await this.userConsumerRepository.createMany(command.usersConsumers);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
