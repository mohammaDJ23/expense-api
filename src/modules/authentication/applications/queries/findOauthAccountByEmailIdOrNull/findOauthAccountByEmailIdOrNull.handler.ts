import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { OauthAccountRepository } from '@/modules/authentication/infrastructure/repositories/oauthAccount.repository';

import { FindOauthAccountByEmailIdOrNullQuery } from './findOauthAccountByEmailIdOrNull.query';

import type { ISelectOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

@QueryHandler(FindOauthAccountByEmailIdOrNullQuery)
export class FindOauthAccountByEmailIdOrNullHandler implements IQueryHandler<
    FindOauthAccountByEmailIdOrNullQuery,
    ISelectOauthAccount | null
> {
    constructor(private readonly oauthAccountRepository: OauthAccountRepository) {}

    async execute(
        query: FindOauthAccountByEmailIdOrNullQuery,
    ): Promise<ISelectOauthAccount | null> {
        try {
            return await this.oauthAccountRepository.findByEmailIdOrNull(query.props.emailId);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
