import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { IsReceiverExistsByUserIdAndIdQuery } from './isReceiverExistsByUserIdAndId.query';

@QueryHandler(IsReceiverExistsByUserIdAndIdQuery)
export class IsReceiverExistsByUserIdAndIdHandler implements IQueryHandler<
    IsReceiverExistsByUserIdAndIdQuery,
    boolean
> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: IsReceiverExistsByUserIdAndIdQuery): Promise<boolean> {
        try {
            return await this.receiverRepository.isExistsByUserIdAndId(
                query.userId,
                query.receiverId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
