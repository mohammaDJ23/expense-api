import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';
import { v4 as uuid } from 'uuid';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateLocalAccountCommand } from '@/modules/authentication/applications/commands/updateLocalAccount/updateLocalAccount.command';
import { FindEmailIdentityByEmailOrNullQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.query';
import { FindLocalAccountByEmailIdOrNullQuery } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.query';
import { AuthenticationResource } from '@/modules/authentication/domain/enums/authentication.enum';
import { AuthenticationMessageEvent } from '@/modules/authentication/domain/enums/authenticationMessageEvent.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import { PasswordHasherService } from './passwordHasher.service';
import { PasswordStorageService } from './passwordStorage.service';
import { PasswordTokenService } from './passwordToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ILocalResetPasswordMessagePayload } from '@/modules/authentication/domain/types/localResetPasswordMessagePayload.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';

@Injectable()
export class LocalResetPasswordService implements IService<LocalResetPasswordRequestDto, boolean> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly passwordTokenService: PasswordTokenService,
        private readonly passwordStorageService: PasswordStorageService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: LocalResetPasswordRequestDto): Promise<boolean> {
        const payload = this.passwordTokenService.verify(input.token);

        {
            let storedToken: string | null = null;
            try {
                storedToken = await this.passwordStorageService.get(payload.email);
            } catch {}

            if (storedToken !== input.token) {
                throw new BadRequestException();
            }
        }

        const emailIdentity = await this.queryBus.execute<
            FindEmailIdentityByEmailOrNullQuery,
            ISelectEmailIdentity | null
        >(
            new FindEmailIdentityByEmailOrNullQuery({
                email: payload.email,
            }),
        );

        if (!emailIdentity) {
            throw new BadRequestException();
        }

        const localAccount = await this.queryBus.execute<
            FindLocalAccountByEmailIdOrNullQuery,
            ISelectLocalAccount | null
        >(
            new FindLocalAccountByEmailIdOrNullQuery({
                emailId: emailIdentity.id,
            }),
        );

        if (!localAccount) {
            throw new BadRequestException();
        }

        const creationTime = getCurrentUTCTimestamp();

        try {
            const hashedPassword = await this.passwordHasherService.hash(input.newPassword);

            await this.commandBus.execute<UpdateLocalAccountCommand, ISelectLocalAccount>(
                new UpdateLocalAccountCommand({
                    id: localAccount.id,
                    hashedPassword,
                    updatedAt: creationTime,
                }),
            );
        } catch {
            throw new InternalServerErrorException('Could not change your password, try again');
        }

        {
            const payload: ILocalResetPasswordMessagePayload = {
                email: emailIdentity.email,
            };

            await this.outboxEventPublisherService.publish({
                aggregateId: uuid(),
                aggregateType: AuthenticationResource.AUTHENTICATION,
                eventType: AuthenticationMessageEvent.LOCAL_RESET_PASSWORD,
                payload,
                createdAt: creationTime,
            });
        }

        return true;
    }
}
