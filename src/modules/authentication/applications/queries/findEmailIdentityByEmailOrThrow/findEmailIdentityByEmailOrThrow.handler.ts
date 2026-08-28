import { NotFoundException } from '@nestjs/common';
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { EmailIdentityRepository } from '@/modules/authentication/infrastructure/repositories/emailIdentity.repository';

import { FindEmailIdentityByEmailOrThrowQuery } from './findEmailIdentityByEmailOrThrow.query';

import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

@QueryHandler(FindEmailIdentityByEmailOrThrowQuery)
export class FindEmailIdentityByEmailOrThrowHandler implements IQueryHandler<
    FindEmailIdentityByEmailOrThrowQuery,
    ISelectEmailIdentity
> {
    constructor(private readonly emailIdentityRepository: EmailIdentityRepository) {}

    async execute(query: FindEmailIdentityByEmailOrThrowQuery): Promise<ISelectEmailIdentity> {
        try {
            return await this.emailIdentityRepository.findByEmailOrThrow(query.props.email);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
