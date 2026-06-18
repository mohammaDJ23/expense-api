import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(command: UpdateUserCommand): Promise<TSelectUser> {
        return this.userRepository.update(command);
    }
}
