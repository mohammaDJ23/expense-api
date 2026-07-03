import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { ExistsReceiverByUserIdAndExcludingIdAndNameQuery } from './existsReceiverByUserIdAndExcludingIdAndName.query';

@QueryHandler(ExistsReceiverByUserIdAndExcludingIdAndNameQuery)
export class ExistsReceiverByUserIdAndExcludingIdAndNameHandler implements IQueryHandler<
    ExistsReceiverByUserIdAndExcludingIdAndNameQuery,
    boolean
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: ExistsReceiverByUserIdAndExcludingIdAndNameQuery): Promise<boolean> {
        try {
            return await this.receiverRepository.existsByUserIdAndExcludingIdAndName(
                query.props.userId,
                query.props.excludingId,
                query.props.name,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
