import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { DeleteManyNotVerifiedUsersCommand } from './deleteManyNotVerifiedUsers.command';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(DeleteManyNotVerifiedUsersCommand)
export class DeleteManyNotVerifiedUsersHandler implements ICommandHandler<DeleteManyNotVerifiedUsersCommand> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(): Promise<TSelectUser[]> {
        return this.userRepository.deleteManyNotVerified();
    }
}
