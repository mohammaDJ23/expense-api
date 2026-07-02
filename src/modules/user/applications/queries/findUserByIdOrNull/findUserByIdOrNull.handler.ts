import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { FindUserByIdOrNullQuery } from './findUserByIdOrNull.query';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(FindUserByIdOrNullQuery)
export class FindUserByIdOrNullHandler implements IQueryHandler<
    FindUserByIdOrNullQuery,
    ISelectUser | null
> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: FindUserByIdOrNullQuery): Promise<ISelectUser | null> {
        try {
            return await this.userRepository.findByIdOrNull(query.props.id);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
