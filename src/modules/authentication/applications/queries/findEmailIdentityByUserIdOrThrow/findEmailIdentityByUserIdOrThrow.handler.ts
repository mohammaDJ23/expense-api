import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { EmailIdentityRepository } from '@/modules/authentication/infrastructure/repositories/emailIdentity.repository';

import { FindEmailIdentityByUserIdrThrowQuery } from './findEmailIdentityByUserIdOrThrow.query';

import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

@QueryHandler(FindEmailIdentityByUserIdrThrowQuery)
export class FindEmailIdentityByUserIdOrThrowHandler implements IQueryHandler<
    FindEmailIdentityByUserIdrThrowQuery,
    ISelectEmailIdentity
> {
    constructor(private readonly emailIdentityRepository: EmailIdentityRepository) {}

    async execute(query: FindEmailIdentityByUserIdrThrowQuery): Promise<ISelectEmailIdentity> {
        try {
            return await this.emailIdentityRepository.findByUserIdOrThrow(query.props.userId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
