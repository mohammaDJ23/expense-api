import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { DeleteReceiverCommand } from './deleteReceiver.command';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@CommandHandler(DeleteReceiverCommand)
export class DeleteReceiverHandler implements ICommandHandler<
    DeleteReceiverCommand,
    ISelectReceiver
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(command: DeleteReceiverCommand): Promise<ISelectReceiver> {
        try {
            return await this.receiverRepository.deleteByUserIdAndId(
                command.props.userId,
                command.props.id,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
