import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateManyUsersConsumersCommand } from '@/modules/consumer/applications/commands/createManyUsersConsumers/createManyUsersConsumers.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@Injectable()
export class CreateManyUsersConsumersService implements IServiceHandler {
    constructor(private readonly commandBus: CommandBus) {}

    async execute(userId: string, consumerIds: string[]): Promise<TSelectUserConsumer[]> {
        try {
            const createManyUsersConsumersCommand = new CreateManyUsersConsumersCommand(
                consumerIds.map((consumerId) => ({
                    userId,
                    consumerId,
                    createdAt: getCurrentUTCTimestamp(),
                })),
            );
            return await this.commandBus.execute<
                CreateManyUsersConsumersCommand,
                TSelectUserConsumer[]
            >(createManyUsersConsumersCommand);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
