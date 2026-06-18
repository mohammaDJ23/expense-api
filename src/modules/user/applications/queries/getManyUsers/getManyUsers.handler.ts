import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { GetManyUsersQuery } from './getManyUsers.query';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(GetManyUsersQuery)
export class GetManyUsersHandler implements IQueryHandler<GetManyUsersQuery> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(query: GetManyUsersQuery): Promise<TSelectUser[]> {
        return this.userRepository.getMany(query.offset, query.limit);
    }
}
