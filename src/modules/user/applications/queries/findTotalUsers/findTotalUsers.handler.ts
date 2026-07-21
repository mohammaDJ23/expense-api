import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { FindTotalUsersQuery } from './findTotalUsers.query';

@QueryHandler(FindTotalUsersQuery)
export class FindTotalUsersHandler implements IQueryHandler<FindTotalUsersQuery, number> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(_: FindTotalUsersQuery): Promise<number> {
        try {
            return await this.userRepository.findTotal();
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
