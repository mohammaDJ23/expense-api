import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { FindUserListQuery } from './findUserList.query';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(FindUserListQuery)
export class FindUserListHandler implements IQueryHandler<FindUserListQuery, ISelectUser[]> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: FindUserListQuery): Promise<ISelectUser[]> {
        try {
            return await this.userRepository.findList(query.props.limit, query.props.cursor);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
