import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UniqueEmailIdentityValidatorService } from '@/modules/authentication/applications/services/validators/uniqueEmailIdentityValidator.service';
import { AuthenticationResource } from '@/modules/authentication/authentication.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import { LocalSignupTokenService } from './localSignupToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ILocalSignupInitiationMessagePayload } from '@/modules/authentication/domain/types/localSignupInitiationMessagePayload.type';

interface IInput {
    email: string;
}

@Injectable()
export class LocalSignupInitiationService implements IService<IInput, boolean> {
    constructor(
        private readonly uniqueEmailIdentityValidatorService: UniqueEmailIdentityValidatorService,
        private readonly localSignupTokenService: LocalSignupTokenService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    async execute(input: IInput): Promise<boolean> {
        await this.uniqueEmailIdentityValidatorService.validate({
            email: input.email,
        });

        {
            const token = this.localSignupTokenService.sign(input.email);
            const payload: ILocalSignupInitiationMessagePayload = {
                token,
                email: input.email,
            };

            await this.outboxEventPublisherService.publish({
                aggregateId: uuid(),
                aggregateType: AuthenticationResource.LOCAL_SIGNUP_INITIATION,
                eventType: 'created',
                payload,
                createdAt: getCurrentUTCTimestamp(),
            });
        }

        return true;
    }
}
