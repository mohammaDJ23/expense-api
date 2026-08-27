import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocalAccountRepository } from '@/modules/authentication/infrastructure/repositories/localAccount.repository';

import { FindLocalAccountByEmailIdOrNullQuery } from './findLocalAccountByEmailIdOrNull.query';

import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

@QueryHandler(FindLocalAccountByEmailIdOrNullQuery)
export class FindLocalAccountByEmailIdOrNullHandler implements IQueryHandler<
    FindLocalAccountByEmailIdOrNullQuery,
    ISelectLocalAccount | null
> {
    constructor(private readonly localAccountRepository: LocalAccountRepository) {}

    async execute(
        query: FindLocalAccountByEmailIdOrNullQuery,
    ): Promise<ISelectLocalAccount | null> {
        try {
            return await this.localAccountRepository.findByEmailIdOrNull(query.props.emailId);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
