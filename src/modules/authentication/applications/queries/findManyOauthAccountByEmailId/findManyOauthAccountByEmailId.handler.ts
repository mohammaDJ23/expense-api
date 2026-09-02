import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { OauthAccountRepository } from '@/modules/authentication/infrastructure/repositories/oauthAccount.repository';

import { FindManyOauthAccountByEmailIdQuery } from './findManyOauthAccountByEmailId.query';

import type { ISelectOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

@QueryHandler(FindManyOauthAccountByEmailIdQuery)
export class FindManyOauthAccountByEmailIdlHandler implements IQueryHandler<
    FindManyOauthAccountByEmailIdQuery,
    ISelectOauthAccount[]
> {
    constructor(private readonly oauthAccountRepository: OauthAccountRepository) {}

    async execute(query: FindManyOauthAccountByEmailIdQuery): Promise<ISelectOauthAccount[]> {
        try {
            return await this.oauthAccountRepository.findManyByEmailId(query.props.emailId);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
