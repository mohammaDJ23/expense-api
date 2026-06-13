import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.command';

import type { TSelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class BillConsumerService {
    constructor(private readonly commandBus: CommandBus) {}

    createMany(billId: string, consumers: TSelectConsumer[]): Promise<TSelectBillConsumer[]> {
        try {
            const createManyBillsConsumersCommand = new CreateManyBillsConsumersCommand(
                consumers.map((consumer) => ({
                    billId,
                    consumerId: consumer.id,
                    createdAt: new Date(),
                })),
            );
            return this.commandBus.execute<CreateManyBillsConsumersCommand, TSelectBillConsumer[]>(
                createManyBillsConsumersCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
