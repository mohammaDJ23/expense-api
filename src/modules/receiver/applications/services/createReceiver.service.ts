import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateReceiverCommand } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class CreateReceiverService implements IServiceHandler {
    constructor(private readonly commandBus: CommandBus) {}

    async execute(name: string): Promise<TSelectReceiver> {
        try {
            const createReceiverCommand = new CreateReceiverCommand({
                name,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
            });
            return await this.commandBus.execute<CreateReceiverCommand, TSelectReceiver>(
                createReceiverCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
