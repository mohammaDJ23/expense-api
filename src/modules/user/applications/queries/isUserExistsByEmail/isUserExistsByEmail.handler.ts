import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { IsUserExistsByEmailQuery } from './isUserExistsByEmail.query';

@QueryHandler(IsUserExistsByEmailQuery)
export class IsUserExistsByEmailHandler implements IQueryHandler<
    IsUserExistsByEmailQuery,
    boolean
> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: IsUserExistsByEmailQuery): Promise<boolean> {
        try {
            return await this.userRepository.isExistsByEmail(query.props.email);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
