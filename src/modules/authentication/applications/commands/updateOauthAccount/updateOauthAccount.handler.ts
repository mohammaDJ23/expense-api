import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { omitUndefined } from '@/core/utils/omitUndefined.util';
import { OauthAccountRepository } from '@/modules/authentication/infrastructure/repositories/oauthAccount.repository';

import { UpdateOauthAccountCommand } from './updateOauthAccount.command';

import type { ISelectOauthAccount } from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

@CommandHandler(UpdateOauthAccountCommand)
export class UpdateOauthAccountHandler implements ICommandHandler<
    UpdateOauthAccountCommand,
    ISelectOauthAccount
> {
    constructor(private readonly oauthAccountRepository: OauthAccountRepository) {}

    async execute(command: UpdateOauthAccountCommand): Promise<ISelectOauthAccount> {
        try {
            return await this.oauthAccountRepository.update(omitUndefined(command.props));
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
