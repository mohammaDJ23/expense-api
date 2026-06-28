import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { DeleteUserCommand } from './deleteUser.command';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand, ISelectUser> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: DeleteUserCommand): Promise<ISelectUser> {
        try {
            return await this.userRepository.deleteById(command.userId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
