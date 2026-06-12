import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateManyBillConsumerCommand } from '@/modules/consumer/applications/commands/createManyBillConsumer/createManyBillConsumer.command';

import type { TSelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class BillConsumerService {
    constructor(private readonly commandBus: CommandBus) {}

    createMany(billId: string, consumers: TSelectConsumer[]): Promise<TSelectBillConsumer[]> {
        try {
            const createManyBillConsumerCommand = new CreateManyBillConsumerCommand(
                consumers.map((consumer) => ({
                    billId,
                    consumerId: consumer.id,
                    createdAt: new Date(),
                })),
            );
            return this.commandBus.execute<CreateManyBillConsumerCommand, TSelectBillConsumer[]>(
                createManyBillConsumerCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
