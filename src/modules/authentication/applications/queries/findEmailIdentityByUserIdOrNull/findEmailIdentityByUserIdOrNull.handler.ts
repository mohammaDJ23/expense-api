import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { EmailIdentityRepository } from '@/modules/authentication/infrastructure/repositories/emailIdentity.repository';

import { FindEmailIdentityByUserIdrNullQuery } from './findEmailIdentityByUserIdOrNull.query';

import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

@QueryHandler(FindEmailIdentityByUserIdrNullQuery)
export class FindEmailIdentityByUserIdOrNullHandler implements IQueryHandler<
    FindEmailIdentityByUserIdrNullQuery,
    ISelectEmailIdentity | null
> {
    constructor(private readonly emailIdentityRepository: EmailIdentityRepository) {}

    async execute(
        query: FindEmailIdentityByUserIdrNullQuery,
    ): Promise<ISelectEmailIdentity | null> {
        try {
            return await this.emailIdentityRepository.findByUserIdOrNull(query.props.userId);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
