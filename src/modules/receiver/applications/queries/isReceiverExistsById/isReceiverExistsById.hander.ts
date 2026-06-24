import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

import { IsReceiverExistsByIdQuery } from './isReceiverExistsById.query';

@QueryHandler(IsReceiverExistsByIdQuery)
export class IsReceiverExistsByIdHandler implements IQueryHandler<IsReceiverExistsByIdQuery> {
    constructor(private readonly receiverRepository: ReceiverRepository) {}

    async execute(query: IsReceiverExistsByIdQuery): Promise<boolean> {
        try {
            return await this.receiverRepository.isExistsById(query.id);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
