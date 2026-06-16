import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateManyConsumersCommand } from '@/modules/consumer/applications/commands/createManyConsumers/createManyConsumers.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class CreateManyConsumersService implements IServiceHandler {
    constructor(private readonly commandBus: CommandBus) {}

    async execute(names: string[]): Promise<TSelectConsumer[]> {
        try {
            const createManyConsumersCommand = new CreateManyConsumersCommand(
                names.map((name) => ({
                    name,
                    createdAt: getCurrentUTCTimestamp(),
                    updatedAt: getCurrentUTCTimestamp(),
                })),
            );
            return await this.commandBus.execute<CreateManyConsumersCommand, TSelectConsumer[]>(
                createManyConsumersCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
