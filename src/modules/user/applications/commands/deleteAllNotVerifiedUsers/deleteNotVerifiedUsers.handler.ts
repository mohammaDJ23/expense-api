import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { DeleteAllNotVerifiedUsersCommand } from './deleteAllNotVerifiedUsers.command';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(DeleteAllNotVerifiedUsersCommand)
export class DeleteAllNotVerifiedUsersHandler implements ICommandHandler<DeleteAllNotVerifiedUsersCommand> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(): Promise<TSelectUser[]> {
        return this.userRepository.deleteAllNotVerified();
    }
}
