import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { EmailIdentityRepository } from '@/modules/authentication/infrastructure/repositories/emailIdentity.repository';

import { CreateEmailIdentityCommand } from './createEmailIdentity.command';

import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

@CommandHandler(CreateEmailIdentityCommand)
export class CreateEmailIdentityHandler implements ICommandHandler<
    CreateEmailIdentityCommand,
    ISelectEmailIdentity
> {
    constructor(private readonly emailIdentityRepository: EmailIdentityRepository) {}

    async execute(command: CreateEmailIdentityCommand): Promise<ISelectEmailIdentity> {
        try {
            return await this.emailIdentityRepository.create(command.props);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
