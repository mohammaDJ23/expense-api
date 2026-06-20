import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { CreateReceiverCommand } from './createReceiver.command';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@CommandHandler(CreateReceiverCommand)
export class CreateReceiverHandler implements ICommandHandler<CreateReceiverCommand> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(command: CreateReceiverCommand): Promise<ISelectReceiver> {
        try {
            return await this.receiverRepository.create(command);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
