import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocalAccountRepository } from '@/modules/authentication/infrastructure/repositories/localAccount.repository';

import { CreateLocalAccountCommand } from './createLocalAccount.command';

import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

@CommandHandler(CreateLocalAccountCommand)
export class CreateLocalAccountHandler implements ICommandHandler<
    CreateLocalAccountCommand,
    ISelectLocalAccount
> {
    constructor(private readonly localAccountRepository: LocalAccountRepository) {}

    async execute(command: CreateLocalAccountCommand): Promise<ISelectLocalAccount> {
        try {
            return await this.localAccountRepository.create(command.props);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
