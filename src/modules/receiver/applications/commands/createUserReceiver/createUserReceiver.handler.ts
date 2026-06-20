import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { CreateUserReceiverCommand } from './createUserReceiver.command';

import type { ISelectUserReceiver } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

@CommandHandler(CreateUserReceiverCommand)
export class CreateUserReceiverHandler implements ICommandHandler<CreateUserReceiverCommand> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    async execute(command: CreateUserReceiverCommand): Promise<ISelectUserReceiver> {
        try {
            return await this.userReceiverRepository.create(command);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
