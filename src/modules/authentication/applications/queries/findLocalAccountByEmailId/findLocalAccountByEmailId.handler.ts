import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocalAccountRepository } from '@/modules/authentication/infrastructure/repositories/localAccount.repository';

import { FindLocalAccountByEmailIdQuery } from './findLocalAccountByEmailId.query';

import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

@QueryHandler(FindLocalAccountByEmailIdQuery)
export class FindLocalAccountByEmailIdHandler implements IQueryHandler<
    FindLocalAccountByEmailIdQuery,
    ISelectLocalAccount
> {
    constructor(private readonly localAccountRepository: LocalAccountRepository) {}

    async execute(query: FindLocalAccountByEmailIdQuery): Promise<ISelectLocalAccount> {
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
