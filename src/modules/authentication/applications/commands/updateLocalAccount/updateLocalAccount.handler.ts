import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocalAccountRepository } from '@/modules/authentication/infrastructure/repositories/localAccount.repository';

import { UpdateLocalAccountCommand } from './updateLocalAccount.command';

import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

@CommandHandler(UpdateLocalAccountCommand)
export class UpdateLocalAccountHandler implements ICommandHandler<
    UpdateLocalAccountCommand,
    ISelectLocalAccount
> {
    constructor(private readonly localAccountRepository: LocalAccountRepository) {}

    async execute(command: UpdateLocalAccountCommand): Promise<ISelectLocalAccount> {
        try {
            return await this.localAccountRepository.update(command.props);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
