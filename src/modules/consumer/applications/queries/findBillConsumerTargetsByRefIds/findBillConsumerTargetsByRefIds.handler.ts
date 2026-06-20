import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';

import { FindBillConsumerTargetsByRefIdsQuery } from './findBillConsumerTargetsByRefIds.query';

import type { ITargetBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';

@QueryHandler(FindBillConsumerTargetsByRefIdsQuery)
export class FindBillConsumerTargetsByRefIdsHandler implements IQueryHandler<FindBillConsumerTargetsByRefIdsQuery> {
    constructor(private readonly billConsumerRepository: BillConsumerRepository) {}

    async execute(query: FindBillConsumerTargetsByRefIdsQuery): Promise<ITargetBillConsumer[]> {
        try {
            return await this.billConsumerRepository.findTargetsByRefIds(query.billIds);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
