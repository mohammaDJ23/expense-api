import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetUserByIdOrNullQuery } from '@/modules/user/applications/queries/getUserByIdOrNull/getUserByIdOrNull.query';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(GetUserByIdOrNullQuery)
export class GetUserByIdOrNullHandler implements IQueryHandler<GetUserByIdOrNullQuery> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(query: GetUserByIdOrNullQuery): Promise<TSelectUser | null> {
        return this.userRepository.getByIdOrNull(query.id);
    }
}
