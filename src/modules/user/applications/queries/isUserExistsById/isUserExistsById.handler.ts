import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { IsUserExistsByIdQuery } from './isUserExistsById.query';

@QueryHandler(IsUserExistsByIdQuery)
export class IsUserExistsByIdHandler implements IQueryHandler<IsUserExistsByIdQuery, boolean> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: IsUserExistsByIdQuery): Promise<boolean> {
        try {
            return await this.userRepository.isExistsById(query.userId);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
