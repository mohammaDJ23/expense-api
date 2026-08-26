import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { OauthAccountRepository } from '@/modules/authentication/infrastructure/repositories/oauthAccount.repository';

import { FindOauthAccountByProviderAndProviderIdOrNullQuery } from './findOauthAccountByProviderAndProviderIdOrNull.query';

import type { ISelectOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

@QueryHandler(FindOauthAccountByProviderAndProviderIdOrNullQuery)
export class FindOauthAccountByProviderAndProviderIdOrNullHandler implements IQueryHandler<
    FindOauthAccountByProviderAndProviderIdOrNullQuery,
    ISelectOauthAccount | null
> {
    constructor(private readonly oauthAccountRepository: OauthAccountRepository) {}

    async execute(
        query: FindOauthAccountByProviderAndProviderIdOrNullQuery,
    ): Promise<ISelectOauthAccount | null> {
        try {
            return await this.oauthAccountRepository.findByProviderAndProviderIdOrNull(
                query.props.provider,
                query.props.providerId,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
