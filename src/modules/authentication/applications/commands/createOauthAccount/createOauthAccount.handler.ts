import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { OauthAccountRepository } from '@/modules/authentication/infrastructure/repositories/oauthAccount.repository';

import { CreateOauthAccountCommand } from './createOauthAccount.command';

import type { ISelectOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

@CommandHandler(CreateOauthAccountCommand)
export class CreateOauthAccountHandler implements ICommandHandler<
    CreateOauthAccountCommand,
    ISelectOauthAccount
> {
    constructor(private readonly oauthAccountRepository: OauthAccountRepository) {}

    async execute(command: CreateOauthAccountCommand): Promise<ISelectOauthAccount> {
        try {
            return await this.oauthAccountRepository.create(command.props);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
