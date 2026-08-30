import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { EmailIdentityRepository } from '@/modules/authentication/infrastructure/repositories/emailIdentity.repository';

import { FindEmailIdentityListQuery } from './findEmailIdentityList.query';

import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

@QueryHandler(FindEmailIdentityListQuery)
export class FindEmailIdentityListHandler implements IQueryHandler<
    FindEmailIdentityListQuery,
    ISelectEmailIdentity[]
> {
    constructor(private readonly emailIdentityRepository: EmailIdentityRepository) {}

    async execute(query: FindEmailIdentityListQuery): Promise<ISelectEmailIdentity[]> {
        try {
            return await this.emailIdentityRepository.findList(
                query.props.limit,
                query.props.cursor,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
