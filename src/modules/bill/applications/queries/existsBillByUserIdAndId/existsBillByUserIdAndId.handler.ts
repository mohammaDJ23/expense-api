import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { BillRepository } from '@/modules/bill/infrastructure/repositories/bill.repository';

import { ExistsBillByUserIdAndIdQuery } from './existsBillByUserIdAndId.query';

@QueryHandler(ExistsBillByUserIdAndIdQuery)
export class ExistsBillByUserIdAndIdHandler implements IQueryHandler<
    ExistsBillByUserIdAndIdQuery,
    boolean
> {
    constructor(private readonly billRepository: BillRepository) {}

    async execute(query: ExistsBillByUserIdAndIdQuery): Promise<boolean> {
        try {
            return await this.billRepository.existsByUserIdAndId(
                query.props.userId,
                query.props.id,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
