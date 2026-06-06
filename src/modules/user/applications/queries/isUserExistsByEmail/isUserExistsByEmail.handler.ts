import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { IsUserExistsByEmailQuery } from './isUserExistsByEmail.query';

@QueryHandler(IsUserExistsByEmailQuery)
export class IsUserExistsByEmailHandler implements IQueryHandler<IsUserExistsByEmailQuery> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(query: IsUserExistsByEmailQuery): Promise<boolean> {
        return this.userRepository.isExistsByEmail(query.email);
    }
}
