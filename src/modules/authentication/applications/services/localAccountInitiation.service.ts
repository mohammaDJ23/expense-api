import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { FindEmailIdentityByEmailOrNullQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.query';
import { FindLocalAccountByEmailIdOrNullQuery } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.query';
import { AuthenticationResource } from '@/modules/authentication/authentication.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import { LocalAccountTokenService } from './localAccountToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ILocalAccountInitiationMessagePayload } from '@/modules/authentication/domain/types/localAccountInitiationMessagePayload.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

interface IInput {
    email: string;
}

@Injectable()
export class LocalAccountInitiationService implements IService<IInput, boolean> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly localAccountTokenService: LocalAccountTokenService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    async execute(input: IInput): Promise<boolean> {
        const emailIdentity = await this.queryBus.execute<
            FindEmailIdentityByEmailOrNullQuery,
            ISelectEmailIdentity | null
        >(
            new FindEmailIdentityByEmailOrNullQuery({
                email: input.email,
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

        {
            const token = this.localAccountTokenService.sign(emailIdentity.email);
            const payload: ILocalAccountInitiationMessagePayload = {
                email: emailIdentity.email,
                token,
            };

            await this.outboxEventPublisherService.publish({
                aggregateId: uuid(),
                aggregateType: AuthenticationResource.LOCAL_ACCOUNT_INITIATION,
                eventType: 'created',
                payload,
                createdAt: getCurrentUTCTimestamp(),
            });
        }

        return true;
    }
}
