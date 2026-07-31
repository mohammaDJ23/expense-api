import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { omitUndefined } from '@/core/utils/omitUndefined.util';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { UpdateUserCommand } from './updateUser.command';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, ISelectUser> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: UpdateUserCommand): Promise<ISelectUser> {
        try {
            return await this.userRepository.update(omitUndefined(command.props));
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
