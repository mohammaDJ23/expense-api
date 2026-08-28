import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { OauthAccountRepository } from '@/modules/authentication/infrastructure/repositories/oauthAccount.repository';

import { FindOauthAccountByIdOrThrowQuery } from './findOauthAccountByIdOrThrow.query';

import type { ISelectOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

@QueryHandler(FindOauthAccountByIdOrThrowQuery)
export class FindOauthAccountByIdOrThrowHandler implements IQueryHandler<
    FindOauthAccountByIdOrThrowQuery,
    ISelectOauthAccount
> {
    constructor(private readonly oauthAccountRepository: OauthAccountRepository) {}

    async execute(query: FindOauthAccountByIdOrThrowQuery): Promise<ISelectOauthAccount> {
        try {
            return await this.oauthAccountRepository.findByIdOrThrow(query.props.id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
