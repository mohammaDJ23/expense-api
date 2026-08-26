import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocalAccountRepository } from '@/modules/authentication/infrastructure/repositories/localAccount.repository';

import { FindLocalAccountByEmailIdOrThrowQuery } from './findLocalAccountByEmailIdOrThrow.query';

import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

@QueryHandler(FindLocalAccountByEmailIdOrThrowQuery)
export class FindLocalAccountByEmailIdOrThrowHandler implements IQueryHandler<
    FindLocalAccountByEmailIdOrThrowQuery,
    ISelectLocalAccount
> {
    constructor(private readonly localAccountRepository: LocalAccountRepository) {}

    async execute(query: FindLocalAccountByEmailIdOrThrowQuery): Promise<ISelectLocalAccount> {
        try {
            return await this.localAccountRepository.findByEmailIdOrThrow(query.props.emailId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
