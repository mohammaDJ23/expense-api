import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { EmailIdentityRepository } from '@/modules/authentication/infrastructure/repositories/emailIdentity.repository';

import { FindEmailIdentityByEmailOrNullQuery } from './findEmailIdentityByEmailOrNull.query';

import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

@QueryHandler(FindEmailIdentityByEmailOrNullQuery)
export class FindEmailIdentityByEmailOrNullHandler implements IQueryHandler<
    FindEmailIdentityByEmailOrNullQuery,
    ISelectEmailIdentity | null
> {
    constructor(private readonly emailIdentityRepository: EmailIdentityRepository) {}

    async execute(
        query: FindEmailIdentityByEmailOrNullQuery,
    ): Promise<ISelectEmailIdentity | null> {
        try {
            return await this.emailIdentityRepository.findByEmailOrNull(query.props.email);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
