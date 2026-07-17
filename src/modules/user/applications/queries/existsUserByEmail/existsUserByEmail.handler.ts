import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { ExistsUserByEmailQuery } from './existsUserByEmail.query';

@QueryHandler(ExistsUserByEmailQuery)
export class ExistsUserByEmailHandler implements IQueryHandler<ExistsUserByEmailQuery, boolean> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: ExistsUserByEmailQuery): Promise<boolean> {
        try {
            return await this.userRepository.existsByEmail(query.props.email);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
