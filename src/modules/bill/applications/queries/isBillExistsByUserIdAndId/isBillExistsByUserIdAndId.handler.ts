import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { IsBillExistsByUserIdAndIdQuery } from '@/modules/bill/applications/queries/isBillExistsByUserIdAndId/isBillExistsByUserIdAndId.query';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

@QueryHandler(IsBillExistsByUserIdAndIdQuery)
export class IsBillExistsByUserIdAndIdHandler implements IQueryHandler<IsBillExistsByUserIdAndIdQuery> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: IsBillExistsByUserIdAndIdQuery): Promise<boolean> {
        try {
            return await this.billRepository.isExistsByUserIdAndId(query.userId, query.id);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
