import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { ExistsReceiverByUserIdAndIdQuery } from './existsReceiverByUserIdAndId.query';

@QueryHandler(ExistsReceiverByUserIdAndIdQuery)
export class ExistsReceiverByUserIdAndIdHandler implements IQueryHandler<
    ExistsReceiverByUserIdAndIdQuery,
    boolean
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: ExistsReceiverByUserIdAndIdQuery): Promise<boolean> {
        try {
            return await this.receiverRepository.existsByUserIdAndId(
                query.props.userId,
                query.props.id,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
