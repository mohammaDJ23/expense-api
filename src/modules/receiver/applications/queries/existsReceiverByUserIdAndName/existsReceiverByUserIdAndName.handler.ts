import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { ExistsReceiverByUserIdAndNameQuery } from './existsReceiverByUserIdAndName.query';

@QueryHandler(ExistsReceiverByUserIdAndNameQuery)
export class ExistsReceiverByUserIdAndNameHandler implements IQueryHandler<
    ExistsReceiverByUserIdAndNameQuery,
    boolean
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: ExistsReceiverByUserIdAndNameQuery): Promise<boolean> {
        try {
            return await this.receiverRepository.existsByUserIdAndName(
                query.props.userId,
                query.props.name,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
