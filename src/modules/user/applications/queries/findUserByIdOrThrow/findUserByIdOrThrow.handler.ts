import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { FindUserByIdOrThrowQuery } from './findUserByIdOrThrow.query';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@QueryHandler(FindUserByIdOrThrowQuery)
export class FindUserByIdOrThrowHandler implements IQueryHandler<
    FindUserByIdOrThrowQuery,
    ISelectUser
> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: FindUserByIdOrThrowQuery): Promise<ISelectUser> {
        try {
            return await this.userRepository.findByIdOrThrow(query.props.id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
