import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class CreateManyBillsConsumersService implements IServiceHandler {
    constructor(private readonly commandBus: CommandBus) {}

    async execute(billId: string, consumers: TSelectConsumer[]): Promise<TSelectBillConsumer[]> {
        try {
            const createManyBillsConsumersCommand = new CreateManyBillsConsumersCommand(
                consumers.map((consumer) => ({
                    billId,
                    consumerId: consumer.id,
                    createdAt: getCurrentUTCTimestamp(),
                })),
            );
            return await this.commandBus.execute<
                CreateManyBillsConsumersCommand,
                TSelectBillConsumer[]
            >(createManyBillsConsumersCommand);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
