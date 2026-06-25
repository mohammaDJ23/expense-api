import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

import { IsUserReceiverExistsByRefIdAndTargetIdQuery } from './isUserReceiverExistsByRefIdAndTargetId.query';

@QueryHandler(IsUserReceiverExistsByRefIdAndTargetIdQuery)
export class IsUserReceiverExistsByRefIdAndTargetIdHandler implements IQueryHandler<IsUserReceiverExistsByRefIdAndTargetIdQuery> {
    constructor(private readonly userReceiverRepository: UserReceiverRepository) {}

    async execute(query: IsUserReceiverExistsByRefIdAndTargetIdQuery): Promise<boolean> {
        try {
            return await this.userReceiverRepository.isExistsByRefIdAndTargetId(
                query.userId,
                query.receiverId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
