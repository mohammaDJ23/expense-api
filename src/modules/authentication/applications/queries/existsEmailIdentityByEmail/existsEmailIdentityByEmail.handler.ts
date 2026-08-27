import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { EmailIdentityRepository } from '@/modules/authentication/infrastructure/repositories/emailIdentity.repository';

import { ExistsEmailIdentityByEmailQuery } from './existsEmailIdentityByEmail.query';

@QueryHandler(ExistsEmailIdentityByEmailQuery)
export class ExistsEmailIdentityByEmailHandler implements IQueryHandler<
    ExistsEmailIdentityByEmailQuery,
    boolean
> {
    constructor(private readonly emailIdentityRepository: EmailIdentityRepository) {}

    async execute(query: ExistsEmailIdentityByEmailQuery): Promise<boolean> {
        try {
            return await this.emailIdentityRepository.existsByEmail(query.props.email);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
