import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { omitUndefined } from '@/core/utils/omitUndefined.util';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { UpdateReceiverCommand } from './updateReceiver.command';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@CommandHandler(UpdateReceiverCommand)
export class UpdateReceiverHandler implements ICommandHandler<
    UpdateReceiverCommand,
    ISelectReceiver
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(command: UpdateReceiverCommand): Promise<ISelectReceiver> {
        try {
            return await this.receiverRepository.update(omitUndefined(command.props));
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
