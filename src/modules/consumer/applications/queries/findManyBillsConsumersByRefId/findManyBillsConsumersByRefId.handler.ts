import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';

import { FindManyBillsConsumersByRefIdQuery } from './findManyBillsConsumersByRefId.query';

import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

@QueryHandler(FindManyBillsConsumersByRefIdQuery)
export class FindManyBillsConsumersByRefIdHandler implements IQueryHandler<
    FindManyBillsConsumersByRefIdQuery,
    ISelectBillConsumer[]
> {
    constructor(private readonly billConsumerRepository: BillConsumerRepository) {}

    async execute(query: FindManyBillsConsumersByRefIdQuery): Promise<ISelectBillConsumer[]> {
        try {
            return await this.billConsumerRepository.findManyByRefId(query.id);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
