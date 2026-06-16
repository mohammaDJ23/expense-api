import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateUserReceiverCommand } from '@/modules/receiver/applications/commands/createUserReceiver/createUserReceiver.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUserReceiver } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

@Injectable()
export class CreateUserReceiverService implements IServiceHandler {
    constructor(private readonly commandBus: CommandBus) {}

    async execute(userId: string, receiverId: string): Promise<TSelectUserReceiver> {
        try {
            const createUserReceiverCommand = new CreateUserReceiverCommand({
                userId,
                receiverId,
                createdAt: getCurrentUTCTimestamp(),
            });
            return await this.commandBus.execute<CreateUserReceiverCommand, TSelectUserReceiver>(
                createUserReceiverCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
