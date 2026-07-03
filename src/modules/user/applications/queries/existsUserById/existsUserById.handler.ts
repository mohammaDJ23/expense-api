import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

import { ExistsUserByIdQuery } from './existsUserById.query';

@QueryHandler(ExistsUserByIdQuery)
export class ExistsUserByIdHandler implements IQueryHandler<ExistsUserByIdQuery, boolean> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: ExistsUserByIdQuery): Promise<boolean> {
        try {
            return await this.userRepository.existsById(query.props.id);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
