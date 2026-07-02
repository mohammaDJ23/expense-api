import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';

import { FindManyBillConsumerTargetsByRefIdsQuery } from './findManyBillConsumerTargetsByRefIds.query';

import type { ITargetBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

@QueryHandler(FindManyBillConsumerTargetsByRefIdsQuery)
export class FindManyBillConsumerTargetsByRefIdsHandler implements IQueryHandler<
    FindManyBillConsumerTargetsByRefIdsQuery,
    ITargetBillConsumer[]
> {
    constructor(private readonly billConsumerRepository: BillConsumerRepository) {}

    async execute(query: FindManyBillConsumerTargetsByRefIdsQuery): Promise<ITargetBillConsumer[]> {
        try {
            return await this.billConsumerRepository.findManyTargetsByRefIds(query.props.billIds);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
