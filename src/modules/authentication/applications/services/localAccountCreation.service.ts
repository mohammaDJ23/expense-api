import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';
import { v4 as uuid } from 'uuid';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateLocalAccountCommand } from '@/modules/authentication/applications/commands/createLocalAccount/createLocalAccount.command';
import { FindEmailIdentityByEmailOrNullQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.query';
import { FindLocalAccountByEmailIdOrNullQuery } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.query';
import { AuthenticationResource } from '@/modules/authentication/authentication.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import { LocalAccountStorageService } from './localAccountStorage.service';
import { LocalAccountTokenService } from './localAccountToken.service';
import { PasswordHasherService } from './passwordHasher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ILocalAccountCreationMessagePayload } from '@/modules/authentication/domain/types/localAccountCreationMessagePayload.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { LocalAccountCreationRequestDto } from '@/modules/authentication/interface/dtos/localAccountCreation.request.dto';

@Injectable()
export class LocalAccountCreationService implements IService<
    LocalAccountCreationRequestDto,
    boolean
> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly localAccountTokenService: LocalAccountTokenService,
        private readonly localAccountStorageService: LocalAccountStorageService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
        private readonly passwordHasherService: PasswordHasherService,
    ) {}

    @Transactional()
    async execute(input: LocalAccountCreationRequestDto): Promise<boolean> {
        const payload = this.localAccountTokenService.verify(input.token);

        {
            let storedToken: string | null = null;
            try {
                storedToken = await this.localAccountStorageService.get(payload.email);
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

        {
            const localAccount = await this.queryBus.execute<
                FindLocalAccountByEmailIdOrNullQuery,
                ISelectLocalAccount | null
            >(
                new FindLocalAccountByEmailIdOrNullQuery({
                    emailId: emailIdentity.id,
                }),
            );

            if (localAccount) {
                throw new BadRequestException();
            }
        }

        let hashedPassword: string;
        try {
            hashedPassword = await this.passwordHasherService.hash(input.password);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        const creationTime = getCurrentUTCTimestamp();

        await this.commandBus.execute<CreateLocalAccountCommand, ISelectLocalAccount>(
            new CreateLocalAccountCommand({
                hashedPassword,
                emailId: emailIdentity.id,
                createdAt: creationTime,
                updatedAt: creationTime,
            }),
        );

        {
            const payload: ILocalAccountCreationMessagePayload = {
                email: emailIdentity.email,
            };

            await this.outboxEventPublisherService.publish({
                aggregateId: uuid(),
                aggregateType: AuthenticationResource.LOCAL_ACCOUNT_CREATION,
                eventType: 'created',
                payload,
                createdAt: creationTime,
            });
        }

        return true;
    }
}
