import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { IUserAbstract } from '@/modules/user/domain/interfaces/userAbstract.interface';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(command: CreateUserCommand): Promise<IUserAbstract> {
        return this.userRepository.create(command);
    }
}
