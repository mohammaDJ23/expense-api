import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { FindUserIdListQuery } from './findUserIdList.query';

import type { IId } from '@/core/types/id.type';

@QueryHandler(FindUserIdListQuery)
export class FindUserIdListHandler implements IQueryHandler<FindUserIdListQuery, IId[]> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: FindUserIdListQuery): Promise<IId[]> {
        try {
            return await this.userRepository.findIdList(query.props.limit, query.props.cursor);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
