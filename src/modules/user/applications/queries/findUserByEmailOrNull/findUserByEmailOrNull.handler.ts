import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { FindUserByEmailOrNullQuery } from './findUserByEmailOrNull.query';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(FindUserByEmailOrNullQuery)
export class FindUserByEmailOrNullHandler implements IQueryHandler<
    FindUserByEmailOrNullQuery,
    ISelectUser | null
> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: FindUserByEmailOrNullQuery): Promise<ISelectUser | null> {
        try {
            return await this.userRepository.findByEmailOrNull(query.props.email);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
