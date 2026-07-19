import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { FindTotalBillsByUserIdQuery } from './findTotalBillsByUserId.query';

@QueryHandler(FindTotalBillsByUserIdQuery)
export class FindTotalBillsByUserIdHandler implements IQueryHandler<
    FindTotalBillsByUserIdQuery,
    number
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: FindTotalBillsByUserIdQuery): Promise<number> {
        try {
            return await this.billRepository.findTotalByUserId(query.props.userId);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
