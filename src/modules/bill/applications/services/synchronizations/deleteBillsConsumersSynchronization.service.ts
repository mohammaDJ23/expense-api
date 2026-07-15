import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { whenNotEmpty } from '@/common/utils/whenNotEmpty.util';
import { DeleteManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/deleteManyBillsConsumers/deleteManyBillsConsumers.command';

import type { IRelationSynchronizationService } from '@/core/interfaces/relationSynchronizationService.interface';
import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

interface IInput {
    billId: string;
    consumerIds: string[];
}

type TOutput = ISelectBillConsumer[];

@Injectable()
export class DeleteBillsConsumersSynchronizationService implements IRelationSynchronizationService<
    IInput,
    TOutput
> {
    constructor(private readonly commandBus: CommandBus) {}

    synchronize(input: IInput): Promise<TOutput> {
        return whenNotEmpty(input.consumerIds, (consumerIds) =>
            this.commandBus.execute<DeleteManyBillsConsumersCommand, ISelectBillConsumer[]>(
                new DeleteManyBillsConsumersCommand({
                    billId: input.billId,
                    ids: consumerIds,
                }),
            ),
        );
    }
}
