import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { FindTotalReceiversByUserIdQuery } from './findTotalReceiversByUserId.query';

@QueryHandler(FindTotalReceiversByUserIdQuery)
export class FindTotalReceiversByUserIdHandler implements IQueryHandler<
    FindTotalReceiversByUserIdQuery,
    number
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: FindTotalReceiversByUserIdQuery): Promise<number> {
        try {
            return await this.receiverRepository.findTotalByUserId(query.props.userId);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
