import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { FindManyUsersQuery } from './findManyUsers.query';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(FindManyUsersQuery)
export class FindManyUsersHandler implements IQueryHandler<FindManyUsersQuery, ISelectUser[]> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<ISelectUser[]> {
        try {
            return await this.userRepository.findMany();
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
