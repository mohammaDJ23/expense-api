import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetUserByEmailOrThrowQuery } from '@/modules/user/applications/queries/getUserByEmailOrThrow/getUserByEmailOrThrow.query';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(GetUserByEmailOrThrowQuery)
export class GetUserByEmailOrThrowHandler implements IQueryHandler<GetUserByEmailOrThrowQuery> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(query: GetUserByEmailOrThrowQuery): Promise<TSelectUser> {
        return this.userRepository.getByEmailOrThrow(query.email);
    }
}
