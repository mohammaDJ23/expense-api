import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetUserByEmailOrNullQuery } from '@/modules/user/applications/queries/getUserByEmailOrNull/getUserByEmailOrNull.query';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(GetUserByEmailOrNullQuery)
export class GetUserByEmailOrNullHandler implements IQueryHandler<GetUserByEmailOrNullQuery> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(query: GetUserByEmailOrNullQuery): Promise<TSelectUser | null> {
        return this.userRepository.getByEmailOrNull(query.email);
    }
}
