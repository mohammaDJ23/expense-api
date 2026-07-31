import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { CreateManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.command';

import type { IRelationSynchronizationService } from '@/core/interfaces/relations/relationSynchronizationService.interface';
import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

interface IInput {
    billId: string;
    consumerIds: string[];
}

@Injectable()
export class CreateBillsConsumersSynchronizationService implements IRelationSynchronizationService<
    IInput,
    ISelectBillConsumer[]
> {
    constructor(private readonly commandBus: CommandBus) {}

    synchronize(input: IInput): Promise<ISelectBillConsumer[]> {
        return whenNotEmpty(input.consumerIds, (consumerIds) =>
            this.commandBus.execute<CreateManyBillsConsumersCommand, ISelectBillConsumer[]>(
                new CreateManyBillsConsumersCommand({
                    billsConsumers: consumerIds.map((consumerId) => ({
                        billId: input.billId,
                        consumerId,
                        createdAt: getCurrentUTCTimestamp(),
                    })),
                }),
            ),
        );
    }
}
