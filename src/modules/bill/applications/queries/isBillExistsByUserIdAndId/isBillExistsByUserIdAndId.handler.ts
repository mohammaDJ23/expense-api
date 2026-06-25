import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { IsBillExistsByUserIdAndIdQuery } from './isBillExistsByUserIdAndId.query';

@QueryHandler(IsBillExistsByUserIdAndIdQuery)
export class IsBillExistsByUserIdAndIdHandler implements IQueryHandler<
    IsBillExistsByUserIdAndIdQuery,
    boolean
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: IsBillExistsByUserIdAndIdQuery): Promise<boolean> {
        try {
            return await this.billRepository.isExistsByUserIdAndId(query.userId, query.id);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
