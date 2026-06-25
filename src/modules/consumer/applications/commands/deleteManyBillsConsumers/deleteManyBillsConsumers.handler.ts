import { CommandHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';

import { DeleteManyBillsConsumersCommand } from './deleteManyBillsConsumers.command';

import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

@CommandHandler(DeleteManyBillsConsumersCommand)
export class DeleteManyBillsConsumersHandler implements IQueryHandler<
    DeleteManyBillsConsumersCommand,
    ISelectBillConsumer[]
> {
    constructor(private readonly billConsumerRepository: BillConsumerRepository) {}

    async execute(query: DeleteManyBillsConsumersCommand): Promise<ISelectBillConsumer[]> {
        try {
            return await this.billConsumerRepository.deleteManyByRefIdAndTargetId(
                query.billId,
                query.consumerIds,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
