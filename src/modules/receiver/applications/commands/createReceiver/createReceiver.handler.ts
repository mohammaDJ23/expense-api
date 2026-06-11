import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { CreateReceiverCommand } from './createReceiver.command';

import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@CommandHandler(CreateReceiverCommand)
export class CreateReceiverHandler implements ICommandHandler<CreateReceiverCommand> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    execute(command: CreateReceiverCommand): Promise<TSelectReceiver> {
        return this.receiverRepository.create(command);
    }
}
