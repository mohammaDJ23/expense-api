import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { DeleteManyNotVerifiedUsersCommand } from './deleteManyNotVerifiedUsers.command';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(DeleteManyNotVerifiedUsersCommand)
export class DeleteManyNotVerifiedUsersHandler implements ICommandHandler<
    DeleteManyNotVerifiedUsersCommand,
    ISelectUser[]
> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<ISelectUser[]> {
        try {
            return await this.userRepository.deleteManyNotVerified();
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
