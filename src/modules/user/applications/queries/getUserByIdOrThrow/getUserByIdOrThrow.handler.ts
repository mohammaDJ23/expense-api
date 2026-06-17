import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetUserByIdOrThrowQuery } from '@/modules/user/applications/queries/getUserByIdOrThrow/getUserByIdOrThrow.query';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(GetUserByIdOrThrowQuery)
export class GetUserByIdOrThrowHandler implements IQueryHandler<GetUserByIdOrThrowQuery> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(query: GetUserByIdOrThrowQuery): Promise<TSelectUser> {
        return this.userRepository.getByIdOrThrow(query.id);
    }
}
