import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { GetUserByIdQuery } from '@/modules/user/applications/queries/getUserById/getUserById.query';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(private readonly userRepository: UserRepository) {}

    execute(query: GetUserByIdQuery): Promise<TSelectUser | null> {
        return this.userRepository.getById(query.id);
    }
}
