import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { CreateUserReceiverCommand } from './createUserReceiver.command';

import type { TSelectUserReceiver } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

@CommandHandler(CreateUserReceiverCommand)
export class CreateUserReceiverHandler implements ICommandHandler<CreateUserReceiverCommand> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    execute(command: CreateUserReceiverCommand): Promise<TSelectUserReceiver> {
        return this.userReceiverRepository.create(command);
    }
}
