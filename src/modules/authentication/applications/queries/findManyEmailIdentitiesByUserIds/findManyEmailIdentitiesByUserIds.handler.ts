import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { EmailIdentityRepository } from '@/modules/authentication/infrastructure/repositories/emailIdentity.repository';

import { FindManyEmailIdentitiesByUserIdsQuery } from './findManyEmailIdentitiesByUserIds.query';

import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

@QueryHandler(FindManyEmailIdentitiesByUserIdsQuery)
export class FindManyEmailIdentitiesByUserIdsHandler implements IQueryHandler<
    FindManyEmailIdentitiesByUserIdsQuery,
    ISelectEmailIdentity[]
> {
    constructor(private readonly emailIdentityRepository: EmailIdentityRepository) {}

    async execute(query: FindManyEmailIdentitiesByUserIdsQuery): Promise<ISelectEmailIdentity[]> {
        try {
            return await this.emailIdentityRepository.findManyByUserIds(query.props.userIds);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
