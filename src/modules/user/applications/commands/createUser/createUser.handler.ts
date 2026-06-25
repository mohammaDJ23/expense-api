import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { CreateUserCommand } from './createUser.command';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, ISelectUser> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: CreateUserCommand): Promise<ISelectUser> {
        try {
            return await this.userRepository.create(command);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
