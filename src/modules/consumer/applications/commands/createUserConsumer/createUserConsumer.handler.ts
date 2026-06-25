import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

import { CreateUserConsumerCommand } from './createUserConsumer.command';

import type { ISelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@CommandHandler(CreateUserConsumerCommand)
export class CreateUserConsumerHandler implements ICommandHandler<
    CreateUserConsumerCommand,
    ISelectUserConsumer
> {
    constructor(private readonly userConsumerRepository: UserConsumerRepository) {}

    async execute(command: CreateUserConsumerCommand): Promise<ISelectUserConsumer> {
        try {
            return await this.userConsumerRepository.create(command);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
