import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { OauthAccountRepository } from '@/modules/authentication/infrastructure/repositories/oauthAccount.repository';

import { FindOauthAccountByProviderAndProviderIdQuery } from './findOauthAccountByProviderAndProviderId.query';

import type { ISelectOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

@QueryHandler(FindOauthAccountByProviderAndProviderIdQuery)
export class FindOauthAccountByProviderAndProviderIdHandler implements IQueryHandler<
    FindOauthAccountByProviderAndProviderIdQuery,
    ISelectOauthAccount | null
> {
    constructor(private readonly oauthAccountRepository: OauthAccountRepository) {}

    async execute(
        query: FindOauthAccountByProviderAndProviderIdQuery,
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
