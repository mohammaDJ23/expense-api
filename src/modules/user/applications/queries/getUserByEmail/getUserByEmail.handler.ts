import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetUserByEmailQuery } from '@/modules/user/applications/queries/getUserByEmail/getUserByEmail.query';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(query: GetUserByEmailQuery): Promise<TSelectUser | null> {
        return this.userRepository.getByEmail(query.email);
    }
}
